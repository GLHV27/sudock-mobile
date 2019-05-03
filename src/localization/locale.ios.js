import { Localization } from 'expo';

export default function getLocale() {
    return Localization.locale.split('-')[0];
}