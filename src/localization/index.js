import getLocale from './locale';
import i18n from 'i18n-js';
import ru from './ru';
import en from './en';

i18n.translations = {
    ru,
    en
};
i18n.locale = getLocale();

export default i18n;
