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
    },
    invisible: {
        opacity: 0
    }
});
