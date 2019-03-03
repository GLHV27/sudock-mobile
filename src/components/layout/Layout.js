import React from 'react';
import { View } from 'react-native';
import style from './style';

export default class Layout extends React.Component {
    render() {
        return (
            <View style={style.container}>
                {this.props.children}
            </View>
        );
    }
}
