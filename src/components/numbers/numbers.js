import React from 'react';
import {inject, observer} from 'mobx-react';
import { View, Text, TouchableOpacity } from 'react-native';
import style from './style';

@inject(({ game, options }) => ({
    numbers: game.numbers,
    usedNumbers: game.usedNumbers,
    isNeedHideUseNumbers: options.isNeedHideUseNumbers,
    onWrite: game.onWrite
}))
@observer
export default class Numbers extends React.Component {
    _onWriteNumber = (number) => {
        this.props.onWrite(number);
    }

    render() {
        const { numbers, usedNumbers, isNeedHideUseNumbers } = this.props;

        return (
            <View style={style.container}>
                {numbers.map((item, i) => {
                    const disabled = isNeedHideUseNumbers && usedNumbers[item];
                    return (
                        <TouchableOpacity
                            key={`number-${i}`}
                            style={style.item}
                            data-index={i}
                            onPress={disabled ? null : this._onWriteNumber.bind(this, item)}
                        >
                            <Text
                                style={[style.text, {opacity: disabled ? 0 : 1}]}
                            >{item}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        );
    }
}
