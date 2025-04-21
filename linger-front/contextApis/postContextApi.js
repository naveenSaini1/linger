import { createContext, useContext, useEffect, useState } from "react";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import useFetchApi from "../hooks/fetchApi";
import { types } from "../constants/TYPES";
import { API_ENDPOINTS, API_HOST_ADDRESS, QUESTION_ANSWER_PRIFIX } from "../constants/API";
import { useMainContextApi } from "./mainContextApi";

const postContextApi = createContext();


export const PostContextApiProvider = ({ children }) => {
    const {user} = useMainContextApi();
    const { fetchApi, loading, error } = useFetchApi();
    const [isErrorMessagePopVisible, setIsErrorMessagePopVisible] = useState(false);

    const handleCreateQuestionAnswer =  async (type, obj) => {
       
        if (type === types.questionAnswer.question) {
            if(!obj.content || !obj.value)return;
            
            let option = {
                url: API_HOST_ADDRESS + QUESTION_ANSWER_PRIFIX + API_ENDPOINTS.createQuestion,
                method: "POST",
                body:{
                    title:obj.value,
                    body:obj.content
                },
                token:user.token
            }

            console.warn(option,obj);

             let data = await fetchApi(option);
             return data;
        }
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
        <postContextApi.Provider value={{ handleCreateQuestionAnswer }}>
            {(loading) &&

                <Loading loading={loading} />
            }

            {/* loading for error Message Model  */}
            {
                (isErrorMessagePopVisible && !loading) &&
                <ErrorMessage errorMessage={error} visible={isErrorMessagePopVisible} onClose={hideErrorMessagePopup} />
            }

            {children}
        </postContextApi.Provider>
    )

}

const usePostContextApi = () => {
    return useContext(postContextApi);
}
export default usePostContextApi;