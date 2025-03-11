import { Stack } from "expo-router";
import "../global.css"
import { useFonts } from "expo-font";
import { ThemeContextApiProvider } from "../contextApis/themeContextApi";


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
    <Stack 
    screenOptions={{headerShown:false}} >
      <Stack.Screen name="register" options={{}} />
      <Stack.Screen name="login" options={{}} />
      <Stack.Screen name="(dash)" options={{}} />
    </Stack>
  </ThemeContextApiProvider>
  )
}
