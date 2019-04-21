import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import { ActionSheetIOS, View } from 'react-native';
import localization from 'localization';
import { levelKeys } from 'components/config';
import Layout from 'components/layout/Layout';
import Button from 'components/button/button';
import style from './style';

const actionSheetOptions = {
    options: [
        localization.actions.cancel,
        localization.levels.easy,
        localization.levels.average,
        localization.levels.complex,
        localization.levels.expert,
    ],
    cancelButtonIndex: 0,
};

@inject(({ nav, game, timer }) => ({
    nav,
    onCreateGame: game.onCreate,
    time: timer.time,
    level: game.level,
    isCanContinue: game.isCanContinue
}))
@observer
class MainScreen extends Component {
    static navigationOptions = {
        title: 'Main'
    }

    _onCreateNewGame = () => {
        ActionSheetIOS.showActionSheetWithOptions(
            actionSheetOptions,
            this._onActionSheet,
        );
    }

    _onContinueGame = () => {
        this.props.nav.goTo('game');
    }

    _onActionSheet = (index) => {
        if (index) {
            this.props.onCreateGame(levelKeys[index]);
            this.props.nav.goTo('game');
        }
    }

    _onSettings = () => {
        this.props.nav.goTo('settings');
    }

    render() {
        const { time, level, isCanContinue } = this.props;

        return (
            <Layout>
                {isCanContinue ? (
                    <View style={style.item}>
                        <Button
                            onPress={this._onContinueGame}
                            title={`Продолжить игру\n (${time} - ${localization.levels[level]})`}
                        />
                    </View>
                ) : null}
                <View style={style.item}>
                    <Button
                        onPress={this._onCreateNewGame}
                        title="Новая игра"
                    />
                </View>
                <View style={style.item}>
                    <Button
                        onPress={this._onSettings}
                        title="Настройки"
                    />
                </View>
            </Layout>
        )
    }

}

export default MainScreen