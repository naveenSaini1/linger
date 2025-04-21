import { createContext, useContext, useEffect, useState } from "react";
import { API_ENDPOINTS, API_HOST_ADDRESS, FOLLOW_PREFIX } from "../constants/API";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import useFetchApi from "../hooks/fetchApi";


const commonContextApi = createContext();



export const CommonContextApiProvider = ({ children }) => {
    const { fetchApi, loading, error } = useFetchApi();

    const [isErrorMessagePopVisible, setIsErrorMessagePopVisible] = useState(false);


    const toggleFollow = async ({ follow, username, token }) => {

        let endpoint = (follow) ? API_ENDPOINTS.followTo : API_ENDPOINTS.unfollow;
        let response = { follow: follow, result: null };

        response.result = await fetchApi({ url: API_HOST_ADDRESS + FOLLOW_PREFIX + endpoint + "/" + username, token: token })

        return response;

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
            <commonContextApi.Provider value={{ toggleFollow }}>
                {(loading) &&

                    <Loading loading={loading} />
                }

                {/* loading for error Message Model  */}
                {
                    (isErrorMessagePopVisible && !loading) &&
                    <ErrorMessage errorMessage={error} visible={isErrorMessagePopVisible} onClose={hideErrorMessagePopup} />
                }

                {children}
            </commonContextApi.Provider>

        </>
    )
}
const useCommonContext = () => {
    return useContext(commonContextApi);
}
export default useCommonContext;