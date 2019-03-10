import React from 'react';
import {inject, observer} from 'mobx-react';
import { View, Text } from 'react-native';
import style from './style';

@inject(({ game }) => ({
    numbers: game.numbers,
}))
@observer
export default class Numbers extends React.Component {
    render() {
        const { numbers } = this.props;

        return (
            <View style={style.container}>
                {numbers.map((item, i) => (
                    <View
                        key={`number-${i}`}
                        style={style.item}
                    >
                        <Text
                            style={style.text}
                        >{item}</Text>
                    </View>
                ))}
            </View>
        );
    }
}
