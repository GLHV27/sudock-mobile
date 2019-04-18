import { StyleSheet } from 'react-native';

export const def = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    container: {
        width: '100%',
        backgroundColor: '#ffffff',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5
    }
});

export const full = StyleSheet.create({
    background: {},
    container: {}
});
