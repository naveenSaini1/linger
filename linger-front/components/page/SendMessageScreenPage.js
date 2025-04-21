import { Stack } from "expo-router";
import ChatScreen from "../message/ChatScreen";
import ChatHeader from "../message/ChatHeader";

import useMessageContextApi from "../../contextApis/messageContextApi";

const SendMessageScreenPage=()=>{
    const {screenData,sendMessage,getTheFriendsList,updateRequest} = useMessageContextApi();

   
    return (
        <>
    
       <Stack.Screen
        options={{
            header: () => (
             <ChatHeader  profileImage={screenData?.profileImage} username={screenData?.username} isOnline={screenData?.isActive} />
            ),
        }}
        />
        <ChatScreen updateRequest={updateRequest} data={screenData} sendMessage={sendMessage} dataRefresh={getTheFriendsList}/>
        </>
    )
}
export default SendMessageScreenPage;