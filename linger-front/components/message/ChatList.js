import { ScrollView, View } from "react-native";
import ChatItem from "./ChatItem";

const ChatList = ({ chats }) => {
  return (
    <View className="">
      {chats?.map((chat, index) => (
        <ChatItem key={index} {...chat} />
      ))}
    </View>
  );
};

export default ChatList;
