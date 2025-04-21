import { View, TextInput, TouchableOpacity, Text, Image } from "react-native";
import { ICONS } from "../../constants/ICONS.JS";

const SearchBar = () => {
  return (
    <View>
    <View className="flex-row items-center p-3 bg-[#FFFFFF] rounded-full shadow-2xl">
      <Image source={ICONS.message.icon} style={{width:24, height:24}}/>
      <TextInput placeholder="Message's" className=" flex-1 text-[#707070]" placeholderTextColor={"#707070"} />
    </View>
    <TouchableOpacity className="mt-2 mb-2">
        <Text className="text-[#707070] font-semibold text-right text-xl">Request's</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
