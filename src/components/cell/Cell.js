import React from 'react';
import { Text, View } from 'react-native';
import style from './style';

export default class Cell extends React.Component {
    render() {
        return (
            <View
                style={[style.default]}
            >
                <Text>{this.props.number}</Text>
            </View>
        );
    }
}
