import { View, Text, Image, TouchableOpacity } from "react-native";
import { ICONS } from "../../constants/ICONS.JS";
import { useRouter } from "expo-router";
import { API_ADDRESS_STATIC, IMAGE_PREFIX } from "../../constants/API";

const ChatHeader = ({ profileImage, username, isOnline }) => {
  const route = useRouter();
  return (
    <View className="flex-row items-center bg-blue-50 px-4 py-2 rounded-b-2xl">
      <TouchableOpacity onPress={() => route.back()} className="p-2">
        <Image source={ICONS.messageScreen.icon} style={{ width: 24, height: 24 }} />
      </TouchableOpacity>
      {profileImage &&
        <Image
          source={{ uri: `${API_ADDRESS_STATIC}${IMAGE_PREFIX}/${profileImage}` }}
          className="w-10 h-10 rounded-full ml-2"
        />

      }


      <View className="ml-3">
        <Text className="text-lg font-semibold">{username}</Text>
        <Text className="text-sm text-gray-500">{isOnline ? "Online" : "Offline"}</Text>
      </View>
    </View>
  );
};

export default ChatHeader;
