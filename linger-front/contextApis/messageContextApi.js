import { useLocalSearchParams } from "expo-router";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import useFetchApi from "../hooks/fetchApi";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import { API_ENDPOINTS, API_HOST_ADDRESS, MESSAGE_PREFIX, USER_PREFIX } from "../constants/API";
import { useMainContextApi } from "./mainContextApi";


const messageContextApi = createContext();


export const MessageContextApiProvider = ({ children }) => {
    const { username } = useLocalSearchParams();
    const [screenData, setScreenData] = useState(null);
    const { fetchApi, loading, error } = useFetchApi();
    const [isErrorMessagePopVisible, setIsErrorMessagePopVisible] = useState(false);
    const { user,webConnection,soketData } = useMainContextApi();
    const [friends, setFriends] = useState();
   
    const getTheFriendsList = () => {
        fetchApi({ url: API_HOST_ADDRESS + MESSAGE_PREFIX + API_ENDPOINTS.getTheFriendsList, token: user.token })
            .then((data) => {
                setFriends(data);
            })
    }

    useEffect(() => {
        if (!friends) {
            getTheFriendsList();

        }
    }, [])
    // load the data of the  the the whic user i am getting form params
    useEffect(() => {
        console.log(username, "usernames");
        if (!screenData && username) {
            fetchApi({ url: API_HOST_ADDRESS + USER_PREFIX + API_ENDPOINTS.getTheUserDetailsForMessage + "/" + username, token: user.token })
                .then((data) => {
                    setScreenData(data);
                })
        }

    }, [username])

    useEffect(()=>{
        if(soketData){
            console.log(soketData,"ussefect")
           
            let newData = { ...screenData };

            if (newData.messages == null) newData.messages = [];
    
            newData.messages.unshift(soketData)
            setScreenData(newData);
        }

    },[soketData])

    const updateRequest = (type) => {
        fetchApi({ url: API_HOST_ADDRESS + MESSAGE_PREFIX + API_ENDPOINTS.toggleTheRequest + "/" +username+"/" + type, token: user.token })
            .then((data) => {
                console.log(data,"update request");
                
            }
        )

    }

    const sendMessage = (message) => {
        if (!message) return;        
        webConnection.current.publish({ destination: "/app/messageMe",  headers: { Authorization: `Bearer ${user.token}`,}, body: JSON.stringify({username,message}) });
       
        // fetchApi({ url: API_HOST_ADDRESS + MESSAGE_PREFIX + API_ENDPOINTS.sendMessage + "/" + username + " /" + message, token: user.token })
        //     .then((data) => {
        //         if (data) {
        //             let newData = { ...screenData };

        //             if (newData.messages == null) newData.messages = [];

        //             newData.messages.unshift(obj)
        //             setScreenData(newData);
        //         }

        //     })



    }


    useEffect(() => {
        if (error) {
            setIsErrorMessagePopVisible(true);

        }
    }, [error])
    const hideErrorMessagePopup = () => {
        setIsErrorMessagePopVisible(false)

    }
    return (
        <>
            <messageContextApi.Provider value={
                {
                    screenData,
                    sendMessage,
                    friends,
                    getTheFriendsList,
                    updateRequest
                }
            }>
                {(loading) &&

                    <Loading loading={loading} />
                }

                {/* loading for error Message Model  */}
                {
                    (isErrorMessagePopVisible && !loading) &&
                    <ErrorMessage errorMessage={error} visible={isErrorMessagePopVisible} onClose={hideErrorMessagePopup} />
                }

                {children}
            </messageContextApi.Provider>

        </>
    )
}
const useMessageContextApi = () => {
    return useContext(messageContextApi);
}

export default useMessageContextApi;