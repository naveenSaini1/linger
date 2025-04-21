import ProfileMainPage from "../../components/page/ProfileMainPage";
import { ProfileContextApiProvider } from "../../contextApis/profileContextApi";

const profile=(opers)=>{
   
  
    return (
        <ProfileContextApiProvider>
        <ProfileMainPage/>
        </ProfileContextApiProvider>
    )
}
export default profile;