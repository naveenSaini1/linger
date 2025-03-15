import { Redirect, Tabs } from "expo-router";
import { useMainContextApi } from "../../contextApis/mainContextApi";
import { CLIENT_ENDPOINTS } from "../../constants/API";

const RootLayout=()=>{
    const {isUserLogedIn} = useMainContextApi();
    
    if(!isUserLogedIn)return (<Redirect href={CLIENT_ENDPOINTS.auth.register}/>)
    return (
        <>
        <Tabs>
        <Tabs.Screen name="index"  />
        <Tabs.Screen name="home"  />
        </Tabs>
        
        </>
    )
}
export default RootLayout;