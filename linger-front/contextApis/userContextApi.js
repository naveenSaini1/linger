import { createContext, useContext, useEffect, useRef, useState } from "react";
import useFetchApi from "../hooks/fetchApi";
import { API_ENDPOINTS, API_HOST_ADDRESS, PUBLIC_PREFIX } from "../constants/API";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import { types } from "../constants/TYPES";
import MessagePopUp from "../components/common/MessagePopUp";
import { useRouter } from "expo-router";


const userContextApi = createContext();

const UserContextApiProvider = ({ children }) => {
    const { fetchApi, loading, error} = useFetchApi();
    const router=useRouter();
    const [isErrorMessagePopVisible, setIsErrorMessagePopVisible] = useState(false);

    const sendCode = async (email) => {
        let option={
            url:API_HOST_ADDRESS + PUBLIC_PREFIX + API_ENDPOINTS.sendCode + "/" + email,
        }
        return await fetchApi(option);
    };
    
    const verifyCoodeForPassword= async (object) => {
        let option={
            url:API_HOST_ADDRESS + PUBLIC_PREFIX + API_ENDPOINTS.verifiyCode,
            body:object,
            method:"POST",
    }
    
       return await fetchApi(option);
    };

    const verifyTheUserByCode= async (object) => {
        let option={
            url:API_HOST_ADDRESS + PUBLIC_PREFIX + API_ENDPOINTS.verifiyUserCode,
            body:object,
            method:"POST",
    }
    
       return await fetchApi(option);
    };
    const hideErrorMessagePopup = () => {
        setIsErrorMessagePopVisible(false)

    }
    // for error popup
    useEffect(() => {
        if (error) {
            setIsErrorMessagePopVisible(true);
        }
    }, [error])






    return (
        <userContextApi.Provider value={{
            sendCode,
            verifyCoodeForPassword,
            verifyTheUserByCode
          
        }}>
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
        </userContextApi.Provider>

    )
}

export default UserContextApiProvider;

export const useUserContextApi = () => {
    return useContext(userContextApi);
}