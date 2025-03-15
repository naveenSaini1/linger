import { Text, TouchableOpacity, View, ActivityIndicator, SafeAreaView } from "react-native";
import BackgroundImage from "../components/common/BackgroundImage";
import Input from "../components/common/Input";
import { useCallback, useRef, useState } from "react";
import { useMainContextApi } from "../contextApis/mainContextApi";
import { useTheme } from "../contextApis/themeContextApi";
import useFetchApi from "../hooks/fetchApi";
import { API_ENDPOINTS, API_HOST_ADDRESS, CLIENT_ENDPOINTS, PUBLIC_PREFIX } from "../constants/API";
import AuthButton from "../components/common/AuthButton";
import GoogleButton from "../components/common/GoogleButton";
import WebView from "react-native-webview";
import LoginWithUrl from "../components/common/LoginWithUrl";
import { useRouter } from "expo-router";

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

const register = () => {
  const { register } = useMainContextApi();
  const { fetchApi, loading, error} = useFetchApi();
  const { theme } = useTheme();
  const [showWebView, setShowWebView] = useState(false);
  const route = useRouter();


  const object = useRef({
    name: { value: "", isValid: false },
    email: { value: "", isValid: false },
    username: { value: "", isValid: false, message: "" },
    password: { value: "", isValid: false },
  });

  const [usernameMessage, setUsernameMessage] = useState("");

  const nameValidation = (text) => text.trim().length > 2;
  const emailValidation = (text) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
  const usernameValidation = (username) => {
    // Length check (3-20 characters)
    if (username.length < 3 || username.length > 20) {
      return false;
    }

    // Allowed characters: a-z, A-Z, 0-9, _
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return false;
    }

    // No consecutive underscores or leading/trailing underscores
    if (/^_|_$|__/.test(username)) {
      return false;
    }

    // Reserved words check
    const reservedWords = new Set(["admin", "root", "system", "support", "test", "null"]);
    if (reservedWords.has(username.toLowerCase())) {
      return false;
    }

    // No emails or phone numbers
    if (username.includes("@") || /^\d{10,15}$/.test(username)) {
      return false;
    }

    return true;
  };
  const passwordValidation = (text) => text.length >= 6;

  const checkUsername =useCallback(debounce(async (username) => {
    if (!usernameValidation(username)) return;
    let option ={
      url: `${API_HOST_ADDRESS}${PUBLIC_PREFIX}${API_ENDPOINTS.checkIfTheUsernameExist}/${username}`,
    }
    const result = await fetchApi(option);

    if (result) {
      setUsernameMessage("Username already taken.");
      object.current.username.isValid = false;
    } else {
      setUsernameMessage("Username is available.");
      object.current.username.isValid = true;
    }
  }, 500),[]);

  const putTheValuesToTheObject = async (type, data) => {
    const { value, isValid } = data;
    object.current[type] = { value, isValid };

    if (type === "username") {
      if (usernameValidation(value)) {
        checkUsername(value);
      }
      else {
        setUsernameMessage("");
      }

    }



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
      name: object.current.name.value,
      email: object.current.email.value,
      username: object.current.username.value,
      password: object.current.password.value,
    };

    register(payload);
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
              Welcome,👋
            </Text>
          </View>

          <Input
            heading="Full Name"
            placeholder="Enter Full Name"
            validateFunction={nameValidation}
            handleCallback={(data) =>
              putTheValuesToTheObject("name", data)
            }
            errorMessage="Enter Valid Name"
          />

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
            heading="Username"
            placeholder="Enter Username"
            validateFunction={usernameValidation}
            handleCallback={(data) =>
              putTheValuesToTheObject("username", data)
            }
            errorMessage="Enter Valid Username"
          />

          {loading ? (
            <Text>Loading...</Text>
          ) : (
            usernameMessage && (
              <View className="w-[90%] mt-[-10px]">
                <Text className={`text-xl ${usernameMessage.includes("taken") ? "text-red-500" : "text-green-500"}`}>
                  {usernameMessage}
                </Text>
              </View>
            )
          )}
          <Input
            heading="Password"
            placeholder="Enter your password"
            validateFunction={passwordValidation}
            handleCallback={(data) =>
              putTheValuesToTheObject("password", data)
            }
            errorMessage="Password must be at least 6 characters"
          />

          <AuthButton title={"Sign Up"} handleCallBack={submit} />
          <Text className="text-[#282A37] mt-8 text-xl" style={{ fontFamily: theme.fontFamilyBald }}>Or</Text>
          <GoogleButton title={"Continue With Google"} handleCallBack={handleGoogleLogin} />



          <LoginWithUrl title={"Already Have Account? "} clickText={"Sign In"} handleCallBack={() => route.push(CLIENT_ENDPOINTS.auth.login)} />

        </View>
      </BackgroundImage>
    </>
  );
};

export default register;
