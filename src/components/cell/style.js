import {StyleSheet} from "react-native";

export default StyleSheet.create({
    default: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: '100%',
        position: 'relative',
    },
    text: {
        position: 'absolute',
        fontSize: 25,
        color: '#000000',
        opacity: 0,
    },
    visible: {
        opacity: 1
    },
    error: {
        color: '#ff3030',
    },
    guessed: {
        color: '#2e65f3',
    }
});
