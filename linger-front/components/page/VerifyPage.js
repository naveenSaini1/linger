import { useRef, useState } from "react";
import { useUserContextApi } from "../../contextApis/userContextApi";
import { useTheme } from "../../contextApis/themeContextApi";
import { useRouter } from "expo-router";
import Input from "../common/Input";
import { Text, TouchableOpacity, View } from "react-native";
import BackgroundImage from "../common/BackgroundImage";
import AuthButton from "../common/AuthButton";
import { CLIENT_ENDPOINTS } from "../../constants/API";
import { useMainContextApi } from "../../contextApis/mainContextApi";

const VerifyPage = () => {

    const { theme } = useTheme();
    const { user,updateUser } = useMainContextApi();
    const { sendCode, verifyTheUserByCode } = useUserContextApi();

    const route = useRouter();
    const [timer, setTimer] = useState(0);
    const [isResending, setIsResending] = useState(false);

    const startTimer = () => {
        // console.log("verifyTheCode", user.email);
        if (user?.email) {
            sendCode(user.email);
        }
        setIsResending(true);
        setTimer(50);
        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev === 1) {
                    clearInterval(interval);
                    setIsResending(false);
                }
                return prev - 1;
            });
        }, 1000);
    };

    const object = useRef("");

    const codeValidation = (text) => text.length >= 1;

    const verifyTheCode = async () => {
        // console.log("verfiying",object);
         console.log(user,"body")
        if (user?.email && codeValidation(object.current)) {
            let body =
            {
                email: user.email,
                code: object.current
            }
           
          let response  = await  verifyTheUserByCode(body);
         
          if(response){
            updateUser({isverified:true})
          }
        }

    };

    if(user?.isverified){
        route.back();
    }

    return (
        <BackgroundImage>
            <View className="items-center mt-auto mb-auto">
                {/* Go Back Button */}


                <View className="w-[90%]">
                    <Text className="text-left text-[#282A37] text-2xl font-bold mb-3">
                        Verify Yourself
                    </Text>
                </View>

                <Input
                    heading="Code"
                    placeholder="Enter Code"
                    validateFunction={codeValidation}
                    handleCallback={(value) => object.current = value.value}
                    errorMessage="Please Enter Valid Code"
                />

                {/* Resend Button with Timer */}
                <TouchableOpacity
                    className={`w-[90%] py-2 rounded-lg flex items-center ${isResending ? "bg-gray-300" : "bg-[#166DF8]"
                        }`}
                    onPress={startTimer}
                    disabled={isResending}
                >
                    <Text
                        className={`text-white text-lg font-semibold ${isResending ? "opacity-75" : ""
                            }`}
                    >
                        {isResending ? `Resend in ${timer}s` : "Resend Code"}
                    </Text>
                </TouchableOpacity>

                {/* Verify Button */}
                <AuthButton title="Verify" handleCallBack={() => verifyTheCode()} />

                <TouchableOpacity
                    className="w-[90%] py-2 px-4  bg-[#000000] rounded-lg mt-4"
                    onPress={() => route.push(CLIENT_ENDPOINTS.auth.register)}
                >
                    <Text className="text-[#ffff] text-lg font-medium text-center">
                        <Text className="text-3xl">←</Text> Go Back
                    </Text>
                </TouchableOpacity>
            </View>
        </BackgroundImage>
    );
};

export default VerifyPage;
