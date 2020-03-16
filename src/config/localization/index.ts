import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import en from './en.json';
import tr from './tr.json';
import ru from './ru.json';

i18n.translations = {
  en,
  tr,
  ru,
};

i18n.locale = Localization.locale;
i18n.fallbacks = true;
