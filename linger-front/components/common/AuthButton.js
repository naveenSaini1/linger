import { Text, TouchableOpacity } from "react-native";
import { useTheme } from "../../contextApis/themeContextApi";

const AuthButton=({title,handleCallBack,loading})=>{
    const {theme} =useTheme();
    return (
        <>
         <TouchableOpacity
         disabled={loading}
            onPress={handleCallBack}
            className="flex justify-center items-center mt-6 rounded-full bg-[#000000] w-[90%] h-[48px]"
          >
            
              <Text
                className="text-white"
                style={{ fontFamily: theme.fontFamilyBald }}
              >
                {title}
              </Text>
          
          </TouchableOpacity>
        
        </>
    )
}
export default AuthButton;