import config from './config';

function _formatString(number = 0) {
    const string = number.toString();
    return string.length === 2 ? string : `0${string}`;
}

function _parse(time = 0) { // second
    const second = time % 60;
    const minutes = Math.floor(time / 60);
    const hours = Math.floor(minutes / 60);
    return [_formatString(hours), _formatString(minutes % 60), _formatString(second)];
}

function _format (second, format) {
    const timeFormat = [];
    const time = _parse(second);

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
        return _format(second, format);
    }
};

export default Formatter;