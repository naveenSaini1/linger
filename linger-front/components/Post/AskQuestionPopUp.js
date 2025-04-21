import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import { types } from '../../constants/TYPES';
import usePostContextApi from '../../contextApis/postContextApi';

const AskQuestionPopUp = ({closeModal,isModalVisible,mode}) => {
    const {handleCreateQuestionAnswer}= usePostContextApi();
    
  const richText = useRef();

  const [selectedQuestion,setSelectedQuestion] = useState("")
    

  const handleSubmit = async () => {
      const content = await richText.current?.getContentHtml();
      console.log('Editor Content:', content);
      handleCreateQuestionAnswer(mode,{
        content,
        value:selectedQuestion
      })
      .then((data)=>{
        console.log(data);
        if(data){
          alert("created Succesfully")
          closeModal();
        }
        else{
          alert("Something Went Wrong")
        }
      })
      // You can also do something else with the content here
    };
 
  

  return (
    <View className="flex-1 bg-white p-4">
      {/* Buttons */}   

      {/* Modal */}
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white p-4 rounded-t-2xl max-h-[90%]">
            <ScrollView showsVerticalScrollIndicator={false}>
              {mode === types.questionAnswer.question && (
                <>
                  <Text className="text-lg font-semibold mb-2">Question Title</Text>
                  <TextInput
                    placeholder="Enter your question"
                    className="border border-gray-300 rounded-lg px-3 py-2 mb-4 text-base"
                    value={selectedQuestion}
                    onChangeText={(t)=>setSelectedQuestion(t)}
                  />
                  <Text className="text-lg font-semibold mb-2">Context</Text>
                </>
              )}

              {mode === types.questionAnswer.answer && (
                <>
                  <Text className="text-lg font-semibold mb-2">Answering:</Text>
                  <Text className="text-base italic mb-4 text-gray-700">{selectedQuestion}</Text>
                </>
              )}

              {/* Editor */}
              <View className="border border-gray-300 rounded-lg overflow-hidden min-h-[200px]">
                <RichEditor
                  ref={richText}
                  placeholder={mode === types.questionAnswer.question ? 'Explain your question...' : 'Write your answer here...'}
                  style={{ minHeight: 200, padding: 2 }}
                  initialHeight={200}
                />
              </View>

              <RichToolbar
                editor={richText}
                style={{ backgroundColor: '#f3f4f6', borderRadius: 8, marginTop: 10 }}
                selectedIconTint="#2563eb" // blue-600 for selected buttons
                iconTint="#4b5563" // gray-700 for default
              
              />
            </ScrollView>

            {/* Action Buttons */}
            <View className="flex-row justify-end mt-6 space-x-4">
              <TouchableOpacity onPress={closeModal} className="px-4 py-2 rounded-md bg-gray-200">
                <Text className="text-gray-700">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSubmit} className="px-4 py-2 rounded-md bg-blue-600">
                <Text className="text-white">Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AskQuestionPopUp;
