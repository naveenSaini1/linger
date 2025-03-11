import { ActivityIndicator, Text } from "react-native";
import { API_ENDPOINTS, API_HOST_ADDRESS, PUBLIC_PREFIX } from "../constants/API";
import useFetchApi from "../hooks/fetchApi";

const { createContext, useState, useEffect, useContext } = require("react");


const mainContextApi=createContext();

const MainContextApiProvider=({children})=>{
    const { fetchApi, loading, error, data, refreshData } = useFetchApi();
    const [user,setUser]= useState({});
    const [isUserLogedIn,setIsUserLogedIn]=useState(false);

    const register=(obj)=>{
        fetchApi(API_HOST_ADDRESS+PUBLIC_PREFIX+API_ENDPOINTS.register,"POST",null,obj);
    }
    const login=(obj)=>{
        fetchApi(API_HOST_ADDRESS+PUBLIC_PREFIX+API_ENDPOINTS.login,"POST",null,obj);
    }
    const checkIfTheUsernameExist=(username)=>{
        fetchApi(API_HOST_ADDRESS+PUBLIC_PREFIX+API_ENDPOINTS.checkIfTheUsernameExist+"/"+username,"GET",null);
    }
    useEffect(()=>{
        if(data!=null){
            setUser(data);
            setIsUserLogedIn(true)
        }
    },[data])


    console.log(error,"errrrrrrrrrrrrrr",user);
    return (
        <mainContextApi.Provider value={{register,checkIfTheUsernameExist}}>
            {(loading)?
              <ActivityIndicator size='large' color={"red"} />
            :children}
            {/* {error?<Text>{error}</Text>:children} */}
            {/* {children} */}
            
        </mainContextApi.Provider>
    )
}

export default MainContextApiProvider;

export const useMainContextApi=()=>{
    return useContext(mainContextApi);
}