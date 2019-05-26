import React from 'react';
import { Button as CustomButton } from 'react-native-elements';
import style from './style';

export default function Button({
    type = 'solid',
    title = '',
    onPress = Function.prototype
}) {
    return (
        <CustomButton
            title={title}
            onPress={onPress}
            buttonStyle={style[type]}
        />
    )
}
