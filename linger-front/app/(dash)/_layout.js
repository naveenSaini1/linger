import { Redirect, Tabs, useRouter } from "expo-router";
import { useMainContextApi } from "../../contextApis/mainContextApi";
import { API_ADDRESS_STATIC, CLIENT_ENDPOINTS, IMAGE_PREFIX } from "../../constants/API";
import { Image, TouchableOpacity, View } from "react-native";
import { ICONS } from "../../constants/ICONS.JS";

const RootLayout = () => {
  const { isUserLogedIn, user } = useMainContextApi();
  const router = useRouter();
  if (!isUserLogedIn) return (<Redirect href={CLIENT_ENDPOINTS.auth.register} />)
  return (
    <>
      <Tabs
        screenOptions={
          {
            headerShown: false,
            // tabBarActiveBackgroundColor:"orange",
            // tabBarInactiveBackgroundColor:"#000000",
            // tabBarInactiveTintColor:"black",
            // tabBarActiveTintColor:"Black",

            tabBarStyle: {
              width: "98%",
              justifyContent: "center",
              alignContent: "center",
              display: "flex",
              margin: "auto",
              backgroundColor: '#000000',
              borderColor: "#707070",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              height: 70,
              marginBottom: 10


            },
          }
        }
      >
        {[
          { name: "index", icon: ICONS.homeScreen.home.icon },
          { name: "group", icon: ICONS.homeScreen.group.icon },
          { name: "post", icon: ICONS.homeScreen.post.icon },
          { name: "message", icon: ICONS.homeScreen.message.icon },
        ].map(({ name, icon }) => (
          <Tabs.Screen
            key={name}
            name={name}
            initialParams={{ username: user.username }}
            options={{
              title: "",
              tabBarIcon: ({ focused }) => (
                <View

                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: 60, // Fixed width for icons
                    height: 60, // Fixed height for icons
                    borderRadius: 30, // Make them round
                    backgroundColor: focused ? "white" : "transparent", // Highlight selected tab
                    marginTop: "auto"
                  }}
                >
                  <Image
                    resizeMode="contains"
                    source={icon}
                    style={{ width: 40, height: 40, tintColor: focused ? "black" : "white" }}
                  />
                </View>
              ),
            }}
          />
        ))}

        <Tabs.Screen
          name="profile"
          options={{
            title: "",
            tabBarIcon: ({ focused }) => (
              // i am using toucableOpacity because of when the user will click on the the profile icon we show the loged username and if we are
              // comming from push and seted parama already and we want to see over Profiel then we will click on profile icon and we will get that
              <TouchableOpacity
              onPress={() => router.push({ pathname: "profile", params: {username:user.username} })}
              style={{
                
                alignItems: "center",
                justifyContent: "center",
                width: 60,
                height: 60,
                marginTop:"auto",
                borderRadius: 30,
                backgroundColor: focused ? "white" : "transparent",
                
              }}
             >
         
               
                <Image
                 resizeMode="contains"
                  source={{ uri: API_ADDRESS_STATIC + IMAGE_PREFIX + "/" + user?.profileImage }}
                  style={{ width: 50, height: 50, borderRadius: 30  }}
                />
              </TouchableOpacity>
            ),
          }}/>
      </Tabs>


    </>
  )
}
export default RootLayout;