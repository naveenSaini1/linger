import React, { useState } from "react";
import { Text, View, TextInput } from "react-native";
import { useTheme } from "../../contextApis/themeContextApi";

const Input = ({ 
  placeholder = "Enter Value", 
  heading = "Value", 
  handleCallback = () => { }, 
  errorMessage = "Please enter a valid value", 
  validateFunction = () => true 
}) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const { theme } = useTheme();

  const handleChange = (text) => {
    setValue(text);
    const isValid = validateFunction(text);

    if (isValid) {
      setError(false);
      handleCallback({value:text,isValid:true});
    } else {
      setError(true);
      handleCallback({value:text,isValid:false});

    }
  };

  return (
    <View className="w-[90%] my-2">
      {/* Input Container */}
      <View 
        className={`rounded-2xl p-3 shadow-sm  bg-white`}
        style={{
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 2,
        }}
      >
        {/* Input Heading (Floating Label) */}
        <Text 
          className={`text-[13px] ${theme.textPrimaryColor} bg-white pb-1`}
          style={{ fontFamily: theme.fontFamilyRegular }}
        >
          {heading}
        </Text>

        {/* Input Field */}
        <TextInput
          className={`text-[14px]  ${theme.textSecondaryColor}`}
          style={{ 
            fontFamily: theme.fontFamilyMedium, 
            paddingVertical: 2,
          }}
          placeholder={placeholder}
          value={value}
          placeholderTextColor={theme.textSecondaryColor}
          onChangeText={handleChange}
        />
      </View>

      {/* Error Message */}
      {error && (
        <Text 
          className="text-red-500 text-[15px] mt-1"
          style={{ fontFamily: theme.fontFamilyBald }}
        >
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

export default Input;
