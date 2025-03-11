import { Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import BackgroundImage from "../components/common/BackgroundImage";
import Input from "../components/common/Input";
import { useRef, useState } from "react";
import { useMainContextApi } from "../contextApis/mainContextApi";
import { useTheme } from "../contextApis/themeContextApi";
import useFetchApi from "../hooks/fetchApi";
import { API_ENDPOINTS, API_HOST_ADDRESS, PUBLIC_PREFIX } from "../constants/API";
import AuthButton from "../components/common/AuthButton";

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
  const { fetchApi, loading, error, data, refreshData } = useFetchApi();
  const { theme } = useTheme();

  const object = useRef({
    name: { value: "", isValid: false },
    email: { value: "", isValid: false },
    username: { value: "", isValid: false, message: "" },
    password: { value: "", isValid: false },
  });

  const [usernameMessage, setUsernameMessage] = useState("");

  const nameValidation = (text) => text.trim().length > 2;
  const emailValidation = (text) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
  const usernameValidation = (text) => text.length >= 4;
  const passwordValidation = (text) => text.length >= 6;

  const checkUsername = debounce(async (username) => {
    if (!usernameValidation(username)) return;

    const result = await fetchApi(
      `${API_HOST_ADDRESS}${PUBLIC_PREFIX}${API_ENDPOINTS.checkIfTheUsernameExist}/${username}`,
      "GET",
      null
    );

    if (result) {
      setUsernameMessage("Username already taken.");
      object.current.username.isValid = false;
    } else {
      setUsernameMessage("Username is available.");
      object.current.username.isValid = true;
    }
  }, 300);

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

  return (
    <>
      <BackgroundImage>
        <View className="flex-1 justify-center items-center">
          <View className="w-[90%]">
            <Text className="text-left text-[#282A37] text-4xl font-bold">
              Welcome,👋
            </Text>
          </View>

          <Input
            heading="Full Name"
            placeholder="Enter your Full Name"
            validateFunction={nameValidation}
            handleCallback={(data) =>
              putTheValuesToTheObject("name", data)
            }
            errorMessage="Enter Valid Name"
          />

          <Input
            heading="Email"
            placeholder="Enter your email"
            validateFunction={emailValidation}
            handleCallback={(data) =>
              putTheValuesToTheObject("email", data)
            }
            errorMessage="Enter Valid Email"
          />

          <Input
            heading="Username"
            placeholder="Enter your username"
            validateFunction={usernameValidation}
            handleCallback={(data) =>
              putTheValuesToTheObject("username", data)
            }
            errorMessage="Enter Valid Username"
          />


          {loading ? (
            <Text>Loadding...</Text>
          ) : (
            <View className="w-[90%] mt-[-10px]">
              <Text
                className={`text-xl  ${usernameMessage.includes("taken")
                    ? "text-red-500"
                    : "text-green-500"
                  }`}
              >
                {usernameMessage}
              </Text>
            </View>
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
          <Text className="text-[#282A37] mt-8 text-xl" style={{fontFamily:theme.fontFamilyBald}}>Or</Text>
        </View>
      </BackgroundImage>
    </>
  );
};

export default register;
