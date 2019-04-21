import React from 'react';
import { Button as CustomButton } from 'react-native-elements';
import { solid } from './style';

const style = {
    solid,
};

export default function Button({
    type = 'solid',
    title = '',
    onPress = Function.prototype
}) {
    const styles = style[type];

    return (
        <CustomButton
            title={title}
            onPress={onPress}
        />
    )
}
