import { Redirect } from "expo-router";
import { Text, View } from "react-native";
import { useMainContextApi } from "../contextApis/mainContextApi";
import { CLIENT_ENDPOINTS } from "../constants/API";

const index=()=>{
    const {isUserLogedIn} = useMainContextApi();
    if(isUserLogedIn)
        return (
    <Redirect href={CLIENT_ENDPOINTS.auth.dash}/>
)
    
    return (<Redirect href={CLIENT_ENDPOINTS.auth.register}/>)
}
export default index;