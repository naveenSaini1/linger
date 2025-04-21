import { View, Text, TouchableOpacity } from "react-native";

const Header = () => {
  return (
    <View className="flex-row justify-between mt-4 ">
      <Text className="text-3xl font-bold text-[#707070]">Chat</Text>
    </View>
  );
};

export default Header;
