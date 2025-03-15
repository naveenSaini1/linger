import { useState, useEffect } from "react";
import { Modal, Text, View, TouchableOpacity } from "react-native";

const ErrorMessage = ({ errorMessage, visible, onClose }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="bg-white p-6 rounded-lg w-4/5 shadow-lg">
          <Text className="text-red-600 text-lg font-semibold mb-3">
            Error
          </Text>
          <Text className="text-gray-800">{errorMessage}</Text>
          <TouchableOpacity
            onPress={onClose}
            className="mt-4 bg-red-600 px-4 py-2 rounded-lg"
          >
            <Text className="text-white text-center font-medium">Dismiss</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ErrorMessage;
