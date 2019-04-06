import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingTop: 15,
    },
    item: {
        width: '33.3333%'
    },
    itemCenter: {
        textAlign: 'center'
    },
    disable: {
        opacity: 0.6
    }
});
