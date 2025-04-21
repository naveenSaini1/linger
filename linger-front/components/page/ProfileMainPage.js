import { RefreshControl, ScrollView, View} from "react-native";


import { useProfileContextApi } from "../../contextApis/profileContextApi";
import { useMainContextApi } from "../../contextApis/mainContextApi";
import ProfileCard from "../profile/ProfileCard";
const ProfileMainPage = () => {
    const { userProfile,updateFollow,refresh,onRefresh } = useProfileContextApi();
    const { user } = useMainContextApi();


    return (
        <>
            <ScrollView
            
        
        refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh}
         />}
            >
                {/* <View className="flex-1 bg-gray-100 p-5"> */}
                    <ProfileCard user={userProfile} toggleFollow={updateFollow} mainUser={user} />
                {/* </View> */}

            </ScrollView>

        </>
    )
}
export default ProfileMainPage;