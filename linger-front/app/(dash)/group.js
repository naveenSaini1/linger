import { Text, TouchableOpacity } from "react-native";
import { useMainContextApi } from "../../contextApis/mainContextApi";

const group=()=>{
     const {logOut} = useMainContextApi();
    return (
        <>
         <Text>Index</Text>
               <TouchableOpacity onPress={()=>logOut()}>
                   <Text>Logout</Text>
               </TouchableOpacity>
        </>
    )
}
export default group;