import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import enLocale from '@/configs/locales/en.json';
import viLocale from '@/configs/locales/vi.json';

i18n.use(initReactI18next).init({
  fallbackLng: 'vi',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: enLocale,
    },
    vi: {
      translation: viLocale,
    },
  },
});

export default i18n;
