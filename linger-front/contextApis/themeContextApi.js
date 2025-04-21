import React, { createContext, useContext, useEffect, useState } from "react";
import MainContextApiProvider from "./mainContextApi";
import { I18nextProvider } from "react-i18next";
import { i18n, init } from "../config/i18n";
import { CommonContextApiProvider } from "./commonContextApi";

const themeContextApi = createContext();

export const ThemeContextApiProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const themes = {
    light: {
      background: "bg-white",
      border: "border-gray-300",
      borderPrimaryColor: "border-[#ECEDF2]",
      textPrimaryColor: "text-[#515978]",
      textSecondaryColor: "text-[#22242F]",
      fontFamilyRegular: "DMRegular",
      fontFamilyMedium: "DMMedium",
      fontFamilyBald: "DMBold"
    },
    dark: {
      background: "bg-gray-900",
      border: "border-gray-700",
      text: "text-white",
      placeholder: "text-gray-500",
      fontFamily: "DMBold",
    }
  };
  useEffect(() => {
    init(); // Initialize localization
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <themeContextApi.Provider value={{ theme: themes[theme], toggleTheme }}>
      <CommonContextApiProvider>
        <MainContextApiProvider>
          <I18nextProvider i18n={i18n}>
            {children}
          </I18nextProvider>
        </MainContextApiProvider>
      </CommonContextApiProvider>
    </themeContextApi.Provider>
  );
};

export const useTheme = () => {
  return useContext(themeContextApi);
};
