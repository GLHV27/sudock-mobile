import React from 'react';
import { Text, View } from 'react-native';
import style from './style';

export default class Logo extends React.Component {
    render() {
        return (
            <View style={style.container}>
                <Text style={style.text}>Sudoku</Text>
            </View>
        );
    }
}
