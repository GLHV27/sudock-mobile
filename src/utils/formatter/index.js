import config from './config';

function _format (date, format) {
    const timeFormat = [];
    const time = date.toLocaleTimeString().split(config.separator);

    format.split(config.separator).forEach(item => {
        const { required, index } = config.formatter[item];
        const value = time[index];

        if (config.defaultValue.indexOf(value) === -1 || required) {
            timeFormat.push(value);
        }
    });

    return timeFormat.join(config.separator);
}

const Formatter = {
    format(second, format = 'h:m:s') {
        return _format(new Date(0, 0, 0, 0, 0, second, 0), format);
    }
};

export default Formatter;