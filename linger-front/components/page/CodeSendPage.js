import { useRef, useState } from "react";
import { useUserContextApi } from "../../contextApis/userContextApi";
import { useTheme } from "../../contextApis/themeContextApi";
import { useRouter } from "expo-router";
import Input from "../common/Input";
import { Text, View } from "react-native";
import BackgroundImage from "../common/BackgroundImage";
import AuthButton from "../common/AuthButton";
import { CLIENT_ENDPOINTS } from "../../constants/API";
import { useTranslation } from "react-i18next";

const CodeSendPage = () => {
    const { t } = useTranslation();
    const { sendCode,verifyCoodeForPassword} = useUserContextApi();
    const { theme } = useTheme();
    const route = useRouter();

    const sendedEmailRef = useRef(null);
    const object = useRef({
        email: { value: "", isValid: false },
        code: { value: "", isValid: false },
        password: { value: "", isValid: false }
    });

    const [showInputs, setShowInputs] = useState(false); // ✅ NEW STATE

    const emailValidation = (text) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
    const codeValidation = (text) => text.length >= 1;
    const passwordValidation = (text) => text.length >= 6;

    const putTheValuesToTheObject = (type, data) => {
        object.current[type] = { value: data.value, isValid: data.isValid };
    };

    const SendCode = async (type) => {
        console.log(type, "type");

        switch (type) {
            case "email":
                if (object.current.email.isValid) {
                    sendedEmailRef.current = object.current.email;
                    const response = await sendCode(object.current.email.value); // ✅ Await API call

                    if (response) {
                        setShowInputs(true); // ✅ Show Code & Password inputs if email exists
                    } else {
                        setShowInputs(false); // ✅ Hide inputs if email is not found
                    }
                } else {
                    alert("Invalid Email");
                }
                break;

            case "code":
                if (
                    object.current.code.isValid &&
                    object.current.password.isValid &&
                    sendedEmailRef.current.isValid
                ) {
                    let body = {
                        code: object.current.code.value,
                        email: sendedEmailRef.current.value,
                        password: object.current.password.value,
                    };
                   let response = await verifyCoodeForPassword(body);
                   if(response){
                    route.push(CLIENT_ENDPOINTS.auth.login)
                   }

                } else {
                    alert("Invalid Inputs");
                }
                break;

            default:
                break;
        }
    };

    return (
        <BackgroundImage>
            <View className="items-center mt-auto mb-auto">
                <View className="w-[90%]">
                    <Text className="text-left text-[#282A37] text-2xl font-bold mb-3">
                        {t('auth.forgot_password.title')}
                    </Text>
                </View>

                {/* Email Input */}
                <Input
                    heading={t('auth.forgot_password.fields.email.label')}
                    placeholder={t('auth.forgot_password.fields.email.placeholder')}
                    validateFunction={emailValidation}
                    handleCallback={(value) => putTheValuesToTheObject("email", value)}
                    errorMessage="Enter Valid Email"
                />

                {/* Show Code & Password Inputs only if email exists */}
                {showInputs && (
                    <>
                        <Input
                            heading="Code"
                            placeholder="Enter Code"
                            validateFunction={codeValidation}
                            handleCallback={(value) => putTheValuesToTheObject("code", value)}
                            errorMessage="Please Enter Valid Code"
                        />

                        <View className="justify-start w-[90%]">
                            <Text className="text-[#166DF8]" style={{ fontFamily: theme.fontFamilyBald }}>
                                Check Mail
                            </Text>
                        </View>

                        <Input
                            heading="Password"
                            placeholder="Enter your password"
                            validateFunction={passwordValidation}
                            handleCallback={(data) => putTheValuesToTheObject("password", data)}
                            errorMessage="Password must be at least 6 characters"
                        />
                    </>
                )}

                {/* Button */}
                <AuthButton
                    title="Send Code"
                    handleCallBack={() => SendCode(showInputs ? "code" : "email")}
                />
            </View>
        </BackgroundImage>
    );
};

export default CodeSendPage;
