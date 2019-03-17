import { getLocale } from 'localization';

const timerFormatter = new Intl.DateTimeFormat(getLocale(), {
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
});

const Formatter = {
    format(second) {
        return timerFormatter.format(new Date(0, 0, 0, 0, 0, second));
    }
};

export default Formatter;