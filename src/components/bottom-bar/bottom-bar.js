import React from 'react';
import { inject, observer } from 'mobx-react';
import { View, Text, TouchableOpacity } from 'react-native';
import style from './style';
import localization from 'localization/index';

@inject(({ game }) => ({
    onBack: game.onBack,
    isHaveHistory: game.isHaveHistory
}))
@observer
export default class BottomBar extends React.Component {
    _onBack = () => {
        if (this.props.isHaveHistory) {
            this.props.onBack();
        }
    }

    render() {
        const { isHaveHistory } = this.props;

        return (
            <View style={style.container}>
                <View style={style.item}>
                    <TouchableOpacity
                        onPress={this._onBack}
                        activeOpacity={isHaveHistory ? 0.2 : 0.5}
                        style={[!isHaveHistory ? style.disable : null]}
                    >
                        <Text>Назад</Text>
                    </TouchableOpacity>
                </View>
                <View style={[style.item, style.itemCenter]}>
                    <Text>Очистить</Text>
                </View>
            </View>
        );
    }
}
