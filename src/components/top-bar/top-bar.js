import React from 'react';
import {inject, observer} from 'mobx-react';
import {View, Text, StyleSheet} from 'react-native';
import Timer from 'components/timer/timer';
import localization from 'localization/index';

@inject(({ game }) => ({
    level: game.level,
    errors: game.errors,
}))
@observer
export default class TopBar extends React.Component {
    render() {
        const { level, errors } = this.props;

        return (
            <View style={style.container}>
                <View style={style.item}>
                    <Text>{localization.levels[level]}</Text>
                </View>
                <View style={[style.item, {textAlign: 'center'}]}>
                    <Text>{`${errors.count}/${errors.total}`}</Text>
                </View>
                <View style={[style.item, {textAlign: 'right'}]}>
                    <Timer />
                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingBottom: 15,
    },
    item: {
        width: '33.3333%'
    },
});
