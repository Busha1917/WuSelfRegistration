import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import am from './locales/am.json';
import om from './locales/om.json';

const savedLang = localStorage.getItem('wu-language') || 'en';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    am: { translation: am },
    om: { translation: om },
  },
  lng: savedLang,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng);
  localStorage.setItem('wu-language', lng);
};

export default i18n;
