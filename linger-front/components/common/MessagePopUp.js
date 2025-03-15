import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";

const MessagePopUp = ({message}) => {
    const [visible, setVisible] = useState(true);

    return (
        <>
            <Modal transparent visible={visible} animationType="fade">
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="bg-white p-6 rounded-lg w-80 shadow-lg">
                        <Text className="text-lg text-gray-800 text-center">{message}</Text>
                        <TouchableOpacity 
                            onPress={() => setVisible(false)} 
                            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg active:bg-blue-600"
                        >
                            <Text className="text-white text-center font-semibold">Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Expose the function globally */}
            {/* <TouchableOpacity 
                onPress={() => showMessage("This is a test message!")} 
                className="p-3 bg-green-500 rounded-lg mt-5"
            >
                <Text className="text-white text-center font-semibold">Show Popup</Text>
            </TouchableOpacity> */}
        </>
    );
};

export default MessagePopUp;
