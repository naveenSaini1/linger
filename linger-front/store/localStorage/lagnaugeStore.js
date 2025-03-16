import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveTranslations = async (language, translations) => {
    try {
      await AsyncStorage.setItem(`translations_${language}`, JSON.stringify(translations));
    } catch (error) {
      console.error(`Failed to save translations for ${language}:`, error);
    }
};

export const loadCachedTranslations = async (language) => {
    try {
      const cached = await AsyncStorage.getItem(`translations_${language}`);
      return cached ? JSON.parse(cached) : null;
    } catch (error) {
      console.error(`Failed to load cached translations for ${language}:`, error);
      return null;
    }
  };

