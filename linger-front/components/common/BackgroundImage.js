const { ImageBackground, View } = require("react-native")
const { ICONS } = require("../../constants/ICONS.JS")

const BackgroundImage = ({ children }) => {

    return (
        <>

            <View className="flex-1 relative">
                {/* Background Image */}
                <ImageBackground
                    source={ICONS.backgroundIcons.icon}
                    resizeMode="cover"
                    style={{
                        flex: 1,
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                    }}
                    imageStyle={{ opacity: 0.2 }}
                />

                {/* Child Elements */}
                <View className="flex-1">{children}</View>
            </View>

        </>
    )
}
export default BackgroundImage;