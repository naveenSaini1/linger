import { useRouter } from "expo-router";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { API_ADDRESS_STATIC, CLIENT_ENDPOINTS, IMAGE_PREFIX } from "../../constants/API";

const ChatItem = ({ profileImage, name, lastMessage, notReadMessageCount, username }) => {
  const route=useRouter();
  return (
    <TouchableOpacity onPress={()=>route.push({pathname:CLIENT_ENDPOINTS.dashboard.message.sendmessagescreen,params:{username}})} className="flex-row items-center p-4 border-b border-gray-200">
      <Image source={{ uri: `${API_ADDRESS_STATIC}${IMAGE_PREFIX}/${profileImage}` }} className="w-12 h-12 rounded-full" />
      <View className="ml-4 flex-1">
        <Text className="text-lg font-semibold">{name}</Text>
        <Text className="text-gray-500">{lastMessage}</Text>
      </View>
      {notReadMessageCount > 0 && (
        <View className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
          <Text className="text-white font-bold text-xs">{notReadMessageCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ChatItem;
