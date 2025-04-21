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
import { Redirect, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { TRANSLATION_KEYS } from "../config/language";

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

  const { register, isUserLogedIn } = useMainContextApi();
  // if (isUserLogedIn)
  //   return (
  //     <Redirect href={CLIENT_ENDPOINTS.auth.dash} />
  //   )
    
  const { fetchApi, loading, error } = useFetchApi();
  const { theme } = useTheme();
  const [showWebView, setShowWebView] = useState(false);
  const route = useRouter();
  const { t } = useTranslation();



  const object = useRef({
    name: { value: "", isValid: false },
    email: { value: "", isValid: false },
    username: { value: "", isValid: false, message: "" },
    password: { value: "", isValid: false },
  });

  const [usernameMessage, setUsernameMessage] = useState("");
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);

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

  const checkUsername = useCallback(debounce(async (username) => {
    if (!usernameValidation(username)) return;
    let option = {
      url: `${API_HOST_ADDRESS}${PUBLIC_PREFIX}${API_ENDPOINTS.checkIfTheUsernameExist}/${username}`,
    }
    const result = await fetchApi(option);
    // console.log(result)
    if (result) {
      setIsUsernameTaken(true)
      setUsernameMessage(t(TRANSLATION_KEYS.auth.register.errors.username_taken));
      object.current.username.isValid = false;
    } else {
      setIsUsernameTaken(false);
      setUsernameMessage(t(TRANSLATION_KEYS.auth.register.messages.username_avilable));
      object.current.username.isValid = true;
    }
  }, 700), []);

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
      alert(t(TRANSLATION_KEYS.auth.register.errors.please_fill_all_field_correctly));
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
              {t(TRANSLATION_KEYS.welcome)},👋
            </Text>
          </View>

          <Input
            heading={t(TRANSLATION_KEYS.auth.register.fields.full_name.label)}
            placeholder={t(TRANSLATION_KEYS.auth.register.fields.full_name.placeholder)}
            validateFunction={nameValidation}
            handleCallback={(data) =>
              putTheValuesToTheObject("name", data)
            }
            errorMessage={t(TRANSLATION_KEYS.auth.register.errors.full_name_required)}
          />

          <Input
            heading={t(TRANSLATION_KEYS.auth.register.fields.email.label)}
            placeholder={t(TRANSLATION_KEYS.auth.register.fields.email.placeholder)}
            validateFunction={emailValidation}
            handleCallback={(data) =>
              putTheValuesToTheObject("email", data)
            }
            errorMessage={t(TRANSLATION_KEYS.auth.register.errors.email_invalid)}
          />

          <Input
            heading={t(TRANSLATION_KEYS.auth.register.fields.username.label)}
            placeholder={t(TRANSLATION_KEYS.auth.register.fields.username.placeholder)}
            validateFunction={usernameValidation}
            handleCallback={(data) =>
              putTheValuesToTheObject("username", data)
            }
            errorMessage={t(TRANSLATION_KEYS.auth.register.errors.username_required)}
          />

          {loading ? (
            <Text>Loading...</Text>
          ) : (
            usernameMessage && (
              <View className="w-[90%] mt-[-10px]">
                <Text className={`text-xl ${isUsernameTaken ? "text-red-500" : "text-green-500"}`}>
                  {isUsernameTaken
                    ? t(TRANSLATION_KEYS.auth.register.errors.username_taken)
                    : t(TRANSLATION_KEYS.auth.register.messages.username_avilable)}
                </Text>
              </View>
            )
          )}

          <Input
            heading={t(TRANSLATION_KEYS.auth.register.fields.password.label)}
            placeholder={t(TRANSLATION_KEYS.auth.register.fields.password.placeholder)}
            validateFunction={passwordValidation}
            handleCallback={(data) =>
              putTheValuesToTheObject("password", data)
            }
            errorMessage={t(TRANSLATION_KEYS.auth.register.errors.password_min_length)}
          />

          <AuthButton title={t(TRANSLATION_KEYS.auth.register.actions.sign_up_btn)} handleCallBack={submit} />
          <Text className="text-[#282A37] mt-8 text-xl" style={{ fontFamily: theme.fontFamilyBald }}>{t(TRANSLATION_KEYS.auth.register.actions.or)}</Text>
          <GoogleButton title={t(TRANSLATION_KEYS.auth.register.actions.continue_with_google)} handleCallBack={handleGoogleLogin} />



          <LoginWithUrl title={t(TRANSLATION_KEYS.auth.register.footer.already_have_account)} clickText={t(TRANSLATION_KEYS.auth.register.footer.sign_in)} handleCallBack={() => route.push(CLIENT_ENDPOINTS.auth.login)} />

        </View>
      </BackgroundImage>
    </>
  );
};

export default register;
