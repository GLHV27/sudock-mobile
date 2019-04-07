// import LocalizedStrings from 'react-native-localization';

// let strings = new LocalizedStrings({
let strings = ({
    ru: {
        actions: {
            cancel: 'Отмена'
        },
        levels: {
            easy: 'Легкая',
            average: 'Средняя',
            complex: 'Сложная',
            expert: 'Экспертная',
        },
        errors: 'Ошибки',
        clear: 'Очистить',
        back: 'Назад',
    },
    en: {
        actions: {
            cancel: 'Cancel'
        },
        levels: {
            easy: 'Easy',
            average: 'Average',
            complex: 'Complex',
            expert: 'Expert',
        },
        errors: 'Errors',
        clear: 'Clear',
        back: 'Back',
    }
// });
})['ru'];

export const getLocale = () => 'ru';

export default strings;
