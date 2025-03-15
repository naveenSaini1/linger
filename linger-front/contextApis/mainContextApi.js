import { ActivityIndicator, Text } from "react-native";
import { API_ENDPOINTS, API_HOST_ADDRESS, CLIENT_ENDPOINTS, PUBLIC_PREFIX } from "../constants/API";
import useFetchApi from "../hooks/fetchApi";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import { useRouter } from "expo-router";

const { createContext, useState, useEffect, useContext } = require("react");


const mainContextApi = createContext();

const MainContextApiProvider = ({ children }) => {
    const { fetchApi, loading, error } = useFetchApi();
    const router                            =useRouter();
    const [user, setUser]                   = useState({});
    const [isUserLogedIn, setIsUserLogedIn] = useState(false);
    const [isErrorMessagePopVisible, setIsErrorMessagePopVisible] = useState(false);

    const register = async (obj) => {
        let option={
            url:API_HOST_ADDRESS + PUBLIC_PREFIX + API_ENDPOINTS.register,
            method:"POST",
            body:obj
        }
        let data  = await fetchApi(option);
        if (data != null) {
            setUser(data);
            setIsUserLogedIn(true)
            router.push(CLIENT_ENDPOINTS.auth.dash);

        }
    }
    const login = async (obj) => {
        let option={
            url:API_HOST_ADDRESS + PUBLIC_PREFIX + API_ENDPOINTS.login,
            method:"POST",
            body:obj
        }
        let data  = await fetchApi(option);
        if (data != null) {
            setUser(data);
            setIsUserLogedIn(true)
            router.push(CLIENT_ENDPOINTS.auth.dash);

        }
    }
    const logOut = () => {
        setUser(null);
        setIsUserLogedIn(false)
    }


    const hideErrorMessagePopup = () => {
        setIsErrorMessagePopVisible(false)

    }
    const updateUser=(obj)=>{
        setUser((pre)=>({...pre,...obj}))
    }

    // for error popup
    useEffect(() => {
        if (error) {
            setIsErrorMessagePopVisible(true);

        }
    }, [error])

    useEffect(()=>{
        if(user && isUserLogedIn){
            if(!user?.isverified){
                router.push(CLIENT_ENDPOINTS.auth.verify)
            }
        }

    },[user,isUserLogedIn])


    console.log(error, "errrrrrrrrrrrrrr", user);
    return (
        <mainContextApi.Provider
            value=
            {{
                user,
                register,
                login,
                isUserLogedIn,
                logOut,
                updateUser
            }}
        >

            {/* loading Model */}
            {(loading) &&

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