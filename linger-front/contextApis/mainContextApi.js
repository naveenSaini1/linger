import { ActivityIndicator, Text } from "react-native";
import { API_ENDPOINTS, API_HOST_ADDRESS, APP_PREFIX, CLIENT_ENDPOINTS, CODE_PREFIX, HOST_ADDRESS, PUBLIC_PREFIX, WEBSOCKET_PREFIX } from "../constants/API";
import useFetchApi from "../hooks/fetchApi";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import { useRouter } from "expo-router";
import { sql, user_table_name } from "../store/sqlStorage/sql";
import { getDbConnection } from "../store/sqlStorage/DbSetup";
import { createUserTableIfExist, dropTable, getTheDataIfExist, inserUser } from "../store/sqlStorage/UserDb";
import { genrateQueryForUserInsert, genrateTableQueryForUser } from "../utils/SqlMethods";
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { constData } from "../constants/TYPES";

const { createContext, useState, useEffect, useContext, useRef } = require("react");


const mainContextApi = createContext();

const MainContextApiProvider = ({ children }) => {
    // alert("hello");
    const { fetchApi, loading, error } = useFetchApi();
    const [mainLoading, setMainLoading] = useState(false);
    const router = useRouter();
    const [user, setUser] = useState({});
    const [isUserLogedIn, setIsUserLogedIn] = useState(false);
    const [isErrorMessagePopVisible, setIsErrorMessagePopVisible] = useState(false);
    const dbConnection = useRef(null);
    const webSokcetConnectionRef = useRef(null);
    const callAfterWebSocketCallBack=useRef();
    const [soketData,setSocketData] = useState(null);

    
    callAfterWebSocketCallBack.current=(response)=>{
        const result = JSON.parse(response.body);
        console.log(result);
        if(result.resultType=="SUCCESS"){
            switch(result.type){
                case constData.ResponseMessageModelType.message:
                    setSocketData(result.data);
                    break;
                case constData.ResponseMessageModelType.notification:
                    break;
                    
            }
           
        }
		
    }
    

    const register = async (obj) => {
        let option = {
            url: API_HOST_ADDRESS + PUBLIC_PREFIX + API_ENDPOINTS.register,
            method: "POST",
            body: obj
        }
        let data = await fetchApi(option);
        if (data != null) {
            setUser(data);
            setIsUserLogedIn(true)
            router.push(CLIENT_ENDPOINTS.auth.dash);

        }
    }
    const login = async (obj) => {
        let option = {
            url: API_HOST_ADDRESS + PUBLIC_PREFIX + API_ENDPOINTS.login,
            method: "POST",
            body: obj
        }
        let data = await fetchApi(option);
        if (data != null) {
            setUser(data);
            setIsUserLogedIn(true)
            createTableAndInsert(data);
            router.push(CLIENT_ENDPOINTS.auth.dash);


        }
    }
    const logOut = () => {
        setUser(null);
        setIsUserLogedIn(false)
    }



    const updateUser = (obj) => {
        setUser((pre) => ({ ...pre, ...obj }))
    }

    // if (user && isUserLogedIn) {
    //     // if user is logedin so go to the dash 
    //     // router.push(CLIENT_ENDPOINTS.auth.dash);
    //     alert("hello");
    // }
    // for error popup
    useEffect(() => {
        if (error) {
            setIsErrorMessagePopVisible(true);

        }
    }, [error])

    useEffect(() => {
        if (user && isUserLogedIn) {
            console.log("in usEffect line No 80", isUserLogedIn)
            // if (!user?.isverified) {
            //     // if user is not verfied then go the verfiy page
            //     router.push(CLIENT_ENDPOINTS.auth.verify)
            // }
            // if user is logedin so go to the dash 
            router.push(CLIENT_ENDPOINTS.auth.dash);

        }
        return (() => {
            console.log("unmount")
        })


    }, [user, isUserLogedIn])



    useEffect(() => {
        if (!dbConnection.current) {
            console.warn("geeting connection")
            getDbConnection()
                .then((db) => {
                    dbConnection.current = db;
                    setUpUserLoged();

                })

        }

    }, [])

    const callApiForSession = async () => {
        return await fetchApi({ url: API_HOST_ADDRESS + CODE_PREFIX + API_ENDPOINTS.establishConnection, token: user.token });

    }
    const establishWebsoketConnection = async () => {
        let session = await callApiForSession();
        if (session) {
            const socketFactory = () => new SockJS(`${HOST_ADDRESS}${WEBSOCKET_PREFIX}?session=${session}`);
            console.log(user.token)
            const stompClient = new Client({
                webSocketFactory: socketFactory,
                debug: (str) => {
                    console.log(str, "hhhh");

                },
                reconnectDelay: 10000,
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,
            });
            stompClient.onConnect = (frame) => {
                console.log('on connect function Connected: ' + frame);
                console.log("username", user.username)
                webSokcetConnectionRef.current = stompClient;
                stompClient.subscribe(APP_PREFIX+"/"+user.username,callAfterWebSocketCallBack.current,{
                    Authorization: `Bearer ${user.token}`,
                })


            };
            stompClient.onStompError = async (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
                // session = await callApiForSession();

            };

            stompClient.activate();
        }
    }
    // let's establish the connection
    useEffect(() => {
        if (user != null && webSokcetConnectionRef.current == null) {
            establishWebsoketConnection();
        }

        return () => {
            console.warn("discnnecting.....");
            if (webSokcetConnectionRef.current) {

                webSokcetConnectionRef.current.deactivate();

            }
        };
    }, [user]);

    // this method will call after the connected to the databse 
    const setUpUserLoged = async () => {
        try {
            let data = await getTheDataIfExist(dbConnection.current, sql.user.select_data);
            if (data) {
                setUser(data);
                setIsUserLogedIn(true);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }



    }

    const createTableAndInsert = async (object) => {
        if (dbConnection.current == null) return null;

        // first let's remove the table
        await dropTable(sql.user.drop_user_table, dbConnection.current);
        // now let's create a table
        let tableCreateQuery = genrateTableQueryForUser(object);
        let insertQuery = genrateQueryForUserInsert(object);
        await createUserTableIfExist(tableCreateQuery, dbConnection.current)
        await inserUser(dbConnection.current, insertQuery)
    }

    const hideErrorMessagePopup = () => {
        setIsErrorMessagePopVisible(false)

    }
    // console.log(error, "errrrrrrrrrrrrrr", user);
    return (
        <mainContextApi.Provider
            value=
            {{
                user,
                register,
                login,
                isUserLogedIn,
                logOut,
                updateUser,
                webConnection:webSokcetConnectionRef,
                soketData

            }}
        >

            {/* loading Model */}
            {(loading || mainLoading) &&

                <Loading loading={loading} />
            }

            {/* loading for error Message Model  */}
            {
                (isErrorMessagePopVisible && !loading) &&
                <ErrorMessage errorMessage={error} visible={isErrorMessagePopVisible} onClose={hideErrorMessagePopup} />
            }
            {children}

        </mainContextApi.Provider>
    )
}

export default MainContextApiProvider;

export const useMainContextApi = () => {
    return useContext(mainContextApi);
}