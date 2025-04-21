import { Stack } from "expo-router";
import { CLIENT_ENDPOINTS } from "../../../constants/API";
import { MessageContextApiProvider } from "../../../contextApis/messageContextApi";

const RootLayout = () => {
    return (
        <MessageContextApiProvider>
          <Stack >
              <Stack.Screen name={"index"} options={{headerShown:false}} />
            </Stack>
        </MessageContextApiProvider>
    )
}
export default RootLayout;