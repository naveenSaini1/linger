import { RefreshControl, SafeAreaView, ScrollView, View } from "react-native";
import Header from "../message/Header";
import SearchBar from "../message/SearchBar";
import ChatList from "../message/ChatList";
import useMessageContextApi from "../../contextApis/messageContextApi";
import { useState } from "react";


const MessagePage = () => {
    const {friends,getTheFriendsList} = useMessageContextApi();
      const [refresh, setRefresh] = useState(false);
        const onRefresh = () => {
          setRefresh(true);
          getTheFriendsList();
          setRefresh(false);
      
        }
    return (
        <>
            <ScrollView className="flex-1 bg-[#F3F8FF] "
             refreshControl={
                <RefreshControl refreshing={refresh} onRefresh={onRefresh}
                />
              }
            >
                <View className=" w-[90%] m-auto ">
                    <Header />
                    <SearchBar />
                </View>

                <View className="mt-3 flex-1 rounded-t-3xl bg-white">
                     <ChatList chats={friends} />
                </View>
               
            </ScrollView>

        </>
    )
}
export default MessagePage;