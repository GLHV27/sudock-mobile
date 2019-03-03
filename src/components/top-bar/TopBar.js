import React from 'react';
import { View, Text } from 'react-native';
import style from './style';

export default class TopBar extends React.Component {
    render() {
        return (
            <View style={style.container}>
                <View style={style.back}>
                    <Text>Назад</Text>
                </View>
            </View>
        );
    }
}
