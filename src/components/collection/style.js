import {StyleSheet} from "react-native";
import { style } from "../config";

export default StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderWidth: 1,
        borderColor: '#000000',
    },
    item: {
        width: '33.3333%',
        borderColor: '#000000',
    },
    selected: {
        backgroundColor: '#bee1ff'
    },
    highlight: {
        backgroundColor: '#ececec'
    },
    highlightByNumber: {
        backgroundColor: '#dadada'
    }
});
