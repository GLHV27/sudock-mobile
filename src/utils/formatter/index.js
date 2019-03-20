import config from './config';

function _format (date, format) {
    const format = [];
    const time = date.toLocaleTimeString().split(config.separator);

    format.split(config.separator).forEach(item => {
        const { required, index } = config.formatter[item];
        const value = time[index];

        if (value !== config.defaultValue || required) {
            format.push(value);
        }
    });

    return format.join(config.separator);
}

const Formatter = {
    format(second, format = 'h:m:s') {
        return _format(new Date(0, 0, 0, 0, 0, second), format);
    }
};

export default Formatter;