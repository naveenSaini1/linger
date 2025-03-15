import { ActivityIndicator, Modal, Text, View } from "react-native";

const Loading = ({ loading }) => {
    console.log(loading)
    return (
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={loading}
            >
                <View className="flex-1 bg-black/50 justify-center items-center">
                    <View className="bg-white p-6 rounded-lg">
                        <ActivityIndicator size="large" color="red" />
                    </View>
                </View>
            </Modal>
        </>
    )
}
export default Loading;