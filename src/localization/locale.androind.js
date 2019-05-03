import { Localization } from 'expo';

export default function getLocale() {
    // const { locale } = await Localization.getLocalizationAsync();
    // return locale.split('-')[0];
    return Localization.locale.split('-')[0];
}
