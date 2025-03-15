import { Stack } from "expo-router";
import "../global.css"
import { useFonts } from "expo-font";
import { ThemeContextApiProvider } from "../contextApis/themeContextApi";
import { CLIENT_ENDPOINTS } from "../constants/API";


export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
 
  return (
  <ThemeContextApiProvider>
    <Stack >
      <Stack.Screen name={CLIENT_ENDPOINTS.index} options={{headerShown:false}} />
      <Stack.Screen name={CLIENT_ENDPOINTS.auth.register} options={{headerShown:false}} />
      <Stack.Screen name={CLIENT_ENDPOINTS.auth.login} options={{headerShown:false}} />
      <Stack.Screen name={CLIENT_ENDPOINTS.auth.dash} options={{headerShown:false}} />
      <Stack.Screen name={CLIENT_ENDPOINTS.auth.verify} options={{headerShown:false}} />
     
      <Stack.Screen name={CLIENT_ENDPOINTS.auth.codeSent} options={{title:"Forgot Password"}}  />
     
    </Stack>
  </ThemeContextApiProvider>
  )
}
