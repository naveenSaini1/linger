import React, { createContext, useContext, useState } from "react";
import MainContextApiProvider from "./mainContextApi";

const themeContextApi = createContext();

export const ThemeContextApiProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const themes = {
    light: {
      background: "bg-white",
      border: "border-gray-300",
      borderPrimaryColor:"border-[#ECEDF2]",
      textPrimaryColor: "text-[#515978]",
      textSecondaryColor:"text-[#22242F]",
      fontFamilyRegular: "DMRegular",
      fontFamilyMedium:"DMMedium",
      fontFamilyBald:"DMBold"
    },
    dark: {
      background: "bg-gray-900",
      border: "border-gray-700",
      text: "text-white",
      placeholder: "text-gray-500",
      fontFamily: "DMBold",
    }
  };


  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <themeContextApi.Provider value={{ theme: themes[theme], toggleTheme }}>
      <MainContextApiProvider>
         {children}
      </MainContextApiProvider>
    </themeContextApi.Provider>
  );
};

export const useTheme = () => {
  return useContext(themeContextApi);
};
