import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import { loadCachedTranslations, saveTranslations } from '../store/localStorage/lagnaugeStore';
import useFetchApi from '../hooks/fetchApi';
import { API_ADDRESS_STATIC, LOCALE_PREFIX } from '../constants/API';


i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3', 
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false, 
    },
});

const fetchTranslations = async (language) => {
    try {
        let response = await fetch(API_ADDRESS_STATIC+LOCALE_PREFIX+"/"+language+".json")
        response = await response.json();
        // console.log(response.auth.register.messages.username_avilable)
        return response;
      } catch (error) {
        console.error(`Failed to fetch translations for ${language}:`, error);
        return null;
      }
};

const setupLanguage = async (language) => {
    // Check if translations are already cached
//   let translations = await loadCachedTranslations(language);
  let translations = await fetchTranslations(language);

  // If not cached, fetch from backend
  if (!translations) {
    translations = await fetchTranslations(language);
    if (translations) {
      await saveTranslations(language, translations);
    }
  }

    // Add translations to i18next
    if (translations) {
        i18n.addResourceBundle(language, 'translation', translations);
        i18n.changeLanguage(language);
    }
};

const init = async () => {
    const deviceLanguage = Localization.locale.split('-')[0]; // e.g., 'en', 'es'
    // console.log(deviceLanguage,"device language init ")
    await setupLanguage("hi");
};

// Change language dynamically
const changeLanguage = async (language) => {
    await setupLanguage(language);
};


export { i18n, init, changeLanguage };