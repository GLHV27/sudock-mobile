import React from 'react';
import { Text, View } from 'react-native';
import style from './style';

export default class Cell extends React.Component {
    render() {
        const { visible } = this.props;
        const opacity = visible ? 1 : 0;

        return (
            <View
                style={[style.default]}
                opacity={opacity}
            >
                <Text>{this.props.value}</Text>
            </View>
        );
    }
}
