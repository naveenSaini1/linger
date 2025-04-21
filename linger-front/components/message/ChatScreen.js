import React, { useRef } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, FlatList } from 'react-native';
import { API_ADDRESS_STATIC, IMAGE_PREFIX } from '../../constants/API';
import { ICONS } from '../../constants/ICONS.JS';
import { constants } from '../../constants/CONSTANTS';

const ChatScreen = ({ data, sendMessage,updateRequest }) => {
  const inputValueRef = useRef(null);

  if (!data) data = {};
  const { userId = "", messages = [], profileImage = "", name = "", type = null, senderId = "" } = data;


  const isUserSender = senderId != userId;
  const isPending = type === constants.CONVERSATION_TYPE.pending;
  const isRejected = type === constants.CONVERSATION_TYPE.rejected;
  const isRequestNotSent = type === null;

  const renderMessage = ({ item }) => {
    const isUserMessage = item.senderId !== userId;

    return (
      <View className={`flex ${isUserMessage ? 'items-end' : 'items-start'} mb-1`}>
        <View className={`p-4 rounded-2xl max-w-[75%] ${isUserMessage ? 'bg-blue-100' : 'bg-gray-100'}`}>
          <Text className="text-gray-800">{item.message}</Text>
        </View>
      </View>
    );
  };

  const handleSubmit = () => {
    sendMessage(inputValueRef.current.value);
    inputValueRef.current.clear();
  };

  const handleRequest=(type)=>{
    updateRequest(type);

  }

  return (
    <View className="flex-1 bg-white p-4 rounded-2xl shadow-lg">
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        inverted
      />

      {isPending && (
        <View className="border border-gray-300 p-4 rounded-lg items-center mt-3">
          <Text className="text-gray-600 font-semibold">Request Pending...</Text>
        </View>
      )}

      {isRejected && (
        <View className="p-2 bg-red-100 text-red-800 text-center rounded-lg mt-3">
          <Text>{(isRejected && isUserSender)?"You Rejected the request":"Request Rejected"}</Text>
        </View>
      )}

      {isRequestNotSent && (
        <TouchableOpacity
          className="border border-gray-300 p-4 rounded-lg items-center mt-3"
          onPress={() => handleRequest(constants.CONVERSATION_TYPE.new)}
        >
          <Text className="text-gray-600 font-semibold">Send Request</Text>
        </TouchableOpacity>
      )}

      {!isUserSender && isPending && (
        <View className="flex-row justify-center mt-3">
          <TouchableOpacity
            className="bg-green-500 px-4 py-2 rounded-lg mr-2"
            onPress={() => handleRequest(constants.CONVERSATION_TYPE.accepted)}
          >
            <Text className="text-white">Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-red-500 px-4 py-2 rounded-lg"
            onPress={() => handleRequest(constants.CONVERSATION_TYPE.rejected)}
          >
            <Text className="text-white">Reject</Text>
          </TouchableOpacity>
        </View>
      )}

      {!isPending && !isRejected && !isRequestNotSent && (
        <View className="flex-row items-center bg-gray-100 p-3 rounded-full mt-4">
          <TextInput
            ref={inputValueRef}
            onChangeText={(e) => (inputValueRef.current.value = e)}
            placeholder="Type a message..."
            className="flex-1 text-gray-800"
          />
          <TouchableOpacity onPress={handleSubmit}>
            <Image source={ICONS.sendMessage.icon} className="w-6 h-6 ml-2" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ChatScreen;
