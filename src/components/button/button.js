import React from 'react';
import { Button as CustomButton } from 'react-native-elements';
import { sizes, styles } from './style';

export default function Button({
    type = 'solid',
    title = '',
    size = 'normal',
    onPress = Function.prototype
}) {
    return (
        <CustomButton
            title={title}
            onPress={onPress}
            buttonStyle={[styles[type].button, sizes[size].button]}
            titleStyle={[styles[type].title, sizes[size].title]}
        />
    )
}
