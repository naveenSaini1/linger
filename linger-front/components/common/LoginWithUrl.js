import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../contextApis/themeContextApi";

const LoginWithUrl = ({ title, clickText, handleCallBack }) => {
    const { theme } = useTheme();
    return (
        <>

            <View className="flex-row justify-center  mt-14">
                <Text className="text-[#282A37] text-sm font-semibold">
                    {title}{' '}
                </Text>
                <TouchableOpacity onPress={handleCallBack}>
                    <Text className="text-[#156CF7] text-sm font-semibold">
                        {clickText}
                    </Text>
                </TouchableOpacity>
            </View>


        </>
    )
}
export default LoginWithUrl;