const config = {
    separator: ':',
    defaultValue: '00',
    formatter: {
        h: {
            index: 0,
            required: false
        },
        m: {
            index: 1,
            required: true
        },
        s: {
            index: 2,
            required: true
        }
    }
};

export default config;
