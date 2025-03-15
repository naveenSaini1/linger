import { Image, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../contextApis/themeContextApi";
import { ICONS } from "../../constants/ICONS.JS";




const GoogleButton=({title,handleCallBack})=>{
    const {theme} =useTheme();

    return (
        <>
                 <TouchableOpacity
                
                    onPress={()=>{handleCallBack()}}
                    className="flex justify-center items-center mt-6 rounded-full bg-[#fff] w-[90%] h-[48px]"
                  >
                    <View className="flex flex-row justify-center items-center gap-4">
                    <Image source={ICONS.googleIcons.icon} style={{width:30,height:30}} />  
                    <Text
                        className="text-black"
                        style={{ fontFamily: theme.fontFamilyBald }}
                      >
                        {title}
                      </Text>                
                    </View>
                      
                  
                  </TouchableOpacity>

        
        </>
    )
}
export default GoogleButton;