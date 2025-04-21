import { Image, Text, TouchableOpacity } from "react-native";
import { useMainContextApi } from "../../contextApis/mainContextApi";
import { ICONS } from "../../constants/ICONS.JS";
import { API_ADDRESS_STATIC, IMAGE_PREFIX } from "../../constants/API";
import { useRouter } from "expo-router";

const index=()=>{
    const {logOut,user} = useMainContextApi();
    const router = useRouter();
    return (
        <>
        <Text>Indexxxx</Text>
        <TouchableOpacity onPress={()=>logOut()}>
            <Text>Logout</Text>
            <TouchableOpacity onPress={()=>router.push({pathname:"profile",params:{username:"name"}})}><Text>profile</Text></TouchableOpacity>
            {/* <Image source={{ uri: API_ADDRESS_STATIC + IMAGE_PREFIX + "/" + user.profileImage }} style={{width:400,height:400}} /> */}
        </TouchableOpacity>
        </>
    )
}
export default index;