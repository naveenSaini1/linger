import { createContext, useContext, useEffect, useState } from "react";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import useFetchApi from "../hooks/fetchApi";
import { API_ENDPOINTS, API_HOST_ADDRESS, FOLLOW_PREFIX, USER_PREFIX } from "../constants/API";
import { useMainContextApi } from "./mainContextApi";
import { useLocalSearchParams } from "expo-router";
import useCommonContext from "./commonContextApi";


const profileContextApi = createContext();


export const ProfileContextApiProvider = ({ children }) => {
    const { fetchApi, loading, error } = useFetchApi();
    const [isErrorMessagePopVisible, setIsErrorMessagePopVisible] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const { username } = useLocalSearchParams(); // Get username from the URL
    const { user } = useMainContextApi();
    const { toggleFollow } = useCommonContext();
    const [refresh,setRefresh] = useState(false);
    useEffect(() => {
        if (username) {
            showUserProfile(username).then((data) => {
                setUserProfile(data);
            })
        }
        else {
            setUserProfile(user);
        }
    }, [username])

    const showUserProfile = async (usernmae) => {
        let option = {
            url: API_HOST_ADDRESS + USER_PREFIX + API_ENDPOINTS.getUserProfile + "/" + usernmae,
            token: user?.token
        }
        console.log(option);
        return await fetchApi(option);
    }

    const onRefresh=async()=>{
        console.log("helllosssss");
        setRefresh(true);
        let option = {
            url: API_HOST_ADDRESS + USER_PREFIX + API_ENDPOINTS.getUserProfile + "/" + userProfile.username,
            token: user?.token
        }
        console.log(option);
        let data = await fetchApi(option);
        setRefresh(false);
        setUserProfile(data);
        
    }
    const updateFollow = async (follow, username) => {
        if (username == user?.username) return;

        let response = await toggleFollow({ follow, username, token: user?.token })
        console.log("hello", follow, response);

        if (response.result == null) return;


        if (response.follow) {
            updateTheUserProfile({ isFollowing: true, followersCount: userProfile.followersCount + 1 })
        }
        else {
            console.log("unfollow")
            updateTheUserProfile({ isFollowing: false, followersCount: userProfile.followersCount - 1 })
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
    const updateTheUserProfile = (data) => {
        let update = { ...userProfile, ...data }
        setUserProfile(update)
    }
    return (
        <profileContextApi.Provider value={{
            showUserProfile,
            userProfile,
            updateFollow,
            refresh,
            onRefresh
           
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


        </profileContextApi.Provider>
    )
}

export const useProfileContextApi = () => {
    return useContext(profileContextApi);
}
