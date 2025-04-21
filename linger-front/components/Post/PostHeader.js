import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AskQuestionPopUp from './AskQuestionPopUp';
import { types } from '../../constants/TYPES';

const PostHeader = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [mode, setMode] = useState(null);
    const [questionTitle, setQuestionTitle] = useState('');
   
      const openModal = (type) => {
        setMode(type);
        setModalVisible(true);
      };
    
      const closeModal = () => {
        setModalVisible(false);
        setMode(null);
        setQuestionTitle('');
      };
  
    return (
        <View className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            {/* Category Tabs */}
            <View className="mb-4">
                <View className="flex-row flex-wrap gap-2">
                    {['All', '#Grammar', '#Reading', '#Speaking'].map((tag, idx) => (
                        <TouchableOpacity
                            key={idx}
                            className={`px-4 py-1.5 rounded-full ${
                                tag === 'All' ? 'bg-gray-900' : 'bg-gray-100'
                            }`}
                        >
                            <Text
                                className={`text-sm ${
                                    tag === 'All' ? 'text-white font-semibold' : 'text-gray-700'
                                }`}
                            >
                                {tag}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Ask / Answer Actions */}
            <View className="flex-row justify-between mx-3 space-x-3">
                <TouchableOpacity className="px-4 py-1.5 border border-gray-300 rounded-full" onPress={()=>openModal(types.questionAnswer.question)}>
                    <Text className="text-gray-700 text-sm font-medium">Ask</Text>
                </TouchableOpacity>
                <TouchableOpacity className="px-4 py-1.5 border border-gray-300 rounded-full" onPress={()=>openModal(types.questionAnswer.answer)}>
                    <Text className="text-gray-700 text-sm font-medium">Answer</Text>
                </TouchableOpacity>
            </View>
            <AskQuestionPopUp  closeModal={closeModal} isModalVisible={isModalVisible} mode={mode} />
        </View>
    );
};

export default PostHeader;
