import { Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import BackgroundImage from "../components/common/BackgroundImage";
import Input from "../components/common/Input";
import { useRef, useState } from "react";
import { useMainContextApi } from "../contextApis/mainContextApi";
import { useTheme } from "../contextApis/themeContextApi";
import { API_ENDPOINTS, API_HOST_ADDRESS, CLIENT_ENDPOINTS, PUBLIC_PREFIX } from "../constants/API";
import AuthButton from "../components/common/AuthButton";
import GoogleButton from "../components/common/GoogleButton";
import WebView from "react-native-webview";
import LoginWithUrl from "../components/common/LoginWithUrl";
import { Redirect, useRouter } from "expo-router";

// Debounce function
const debounce = (func, delay) => {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

const login = () => {
    const { login, isUserLogedIn } = useMainContextApi();
    const { theme } = useTheme();
    const [showWebView, setShowWebView] = useState(false);
    const route = useRouter();
    // if (isUserLogedIn)
    //     return (
    //         <Redirect href={CLIENT_ENDPOINTS.auth.dash} />
    //     )

    const object = useRef({
        email: { value: "", isValid: false },
        password: { value: "", isValid: false },
    });


    const emailValidation = (text) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
    const passwordValidation = (text) => text.length >= 6;


    const putTheValuesToTheObject = async (type, data) => {
        const { value, isValid } = data;
        object.current[type] = { value, isValid };

    };

    const submit = () => {
        const isAllValid = Object.values(object.current).every(
            (field) => field.isValid
        );

        if (!isAllValid) {
            alert("Please fill all fields correctly.");
            return;
        }

        const payload = {
            email: object.current.email.value,
            password: object.current.password.value,
        };

        login(payload);
    };

    const handleGoogleLogin = () => {
        setShowWebView(true);
    };

    const handleNavigationStateChange = (navState) => {
        const url = navState.url;
        // if (url.includes('http://YOUR_BACKEND_URL/api/auth/google/callback')) {
        //   // Extract the JWT token from the URL
        //   const token = new URLSearchParams(url.split('?')[1]).get('token');

        //   if (token) {
        //     // Store the JWT token in AsyncStorage
        //     AsyncStorage.setItem('token', token);
        //     setShowWebView(false);
        //     console.log('JWT Token Received:', token);
        //   }
        // }
    };

    if (showWebView) {
        return <WebView
            source={{ uri: `${API_HOST_ADDRESS + PUBLIC_PREFIX + API_ENDPOINTS.googleLognUrl}` }}
            onNavigationStateChange={handleNavigationStateChange}
        />
    }
    return (
        <>
            <BackgroundImage>
                <View className="items-center mt-auto mb-auto">

                    <View className="w-[90%]">
                        <Text className="text-left text-[#282A37] text-4xl font-bold">
                            Welcome,Back 👋
                        </Text>
                    </View>
                    <Input
                        heading="Email"
                        placeholder="Enter Email"
                        validateFunction={emailValidation}
                        handleCallback={(data) =>
                            putTheValuesToTheObject("email", data)
                        }
                        errorMessage="Enter Valid Email"
                    />

                    <Input
                        heading="Password"
                        placeholder="Enter Password"
                        validateFunction={passwordValidation}
                        handleCallback={(data) =>
                            putTheValuesToTheObject("password", data)
                        }
                        errorMessage="Password must be at least 6 characters"
                    />
                    <View className="justify-start w-[90%]">
                        <TouchableOpacity onPress={() => route.push(CLIENT_ENDPOINTS.auth.codeSent)} ><Text className="text-[#166DF8]" style={{ fontFamily: theme.fontFamilyBald }}>Forget Password?</Text></TouchableOpacity>
                    </View>
                    <AuthButton title={"Sign In"} handleCallBack={submit} />
                    <Text className="text-[#282A37] mt-8 text-xl" style={{ fontFamily: theme.fontFamilyBald }}>Or</Text>
                    <GoogleButton title={"Continue With Google"} handleCallBack={handleGoogleLogin} />

                    <LoginWithUrl title={"Don't Have Account ? "} clickText={"Sign Up"} handleCallBack={() => route.push(CLIENT_ENDPOINTS.auth.register)} />
                </View>
            </BackgroundImage>
        </>
    );
};

export default login;
