const separator = ':';
const methodKeys = {
    h: 'getHous',
    m: 'getMinutes',
    s: 'getSeconds'
};

function _format (date, format) {
    const format = [];

    format.split(separator).forEach(item => {
        const value = date[methodKeys[itrm]]();

        if (value) {
            format.push(value);
        }
    });

    return format.join(separator);
}

const Formatter = {
    format(second, format = 'h:m:s') {
        return _format(new Date(0, 0, 0, 0, 0, second), format);
    }
};

export default Formatter;