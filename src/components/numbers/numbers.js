import React from 'react';
import {inject, observer} from 'mobx-react';
import { View, Text, TouchableOpacity } from 'react-native';
import style from './style';

@inject(({ game }) => ({
    numbers: game.numbers,
    onWrite: game.onWrite
}))
@observer
export default class Numbers extends React.Component {
    _onWriteNumber = (index) => {
        this.props.onWrite(index + 1);
    }

    render() {
        const { numbers } = this.props;

        return (
            <View style={style.container}>
                {numbers.map((item, i) => (
                    <TouchableOpacity
                        key={`number-${i}`}
                        style={style.item}
                        data-index={i}
                        onPress={this._onWriteNumber.bind(this, i)}
                    >
                        <Text
                            style={style.text}
                        >{item}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    }
}
