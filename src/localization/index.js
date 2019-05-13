import { Localization } from 'expo';
import i18n from 'i18n-js';
import ru from './ru';
import en from './en';

function _getLocale() {
    let locale =  Localization.locale.split('-')[0];

    if (!(locale in i18n.translations)) {
        locale = 'en';
    }

    return locale;
}

i18n.translations = {
    ru,
    en
};
i18n.locale = _getLocale();

export default i18n;
