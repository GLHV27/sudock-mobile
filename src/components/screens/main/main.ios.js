import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import { ActionSheetIOS, View } from 'react-native';
import i18n from 'localization';
import { levelKeys } from 'components/config';
import Layout from 'components/layout/Layout';
import Button from 'components/button/button';
import style from './style';

const actionSheetOptions = {
    options: [
        i18n.t('actions.cancel'),
        i18n.t('levels.easy'),
        i18n.t('levels.average'),
        i18n.t('levels.complex'),
        i18n.t('levels.expert'),
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
        headerBackTitle: i18n.t('back')
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
                            title={`${i18n.t('continueGame')}\n (${time} - ${i18n.t(`levels.${level}`)})`}
                        />
                    </View>
                ) : null}
                <View style={style.item}>
                    <Button
                        onPress={this._onCreateNewGame}
                        title={i18n.t('newGame')}
                    />
                </View>
                <View style={style.item}>
                    <Button
                        onPress={this._onSettings}
                        title={i18n.t('settings')}
                    />
                </View>
            </Layout>
        )
    }

}

export default MainScreen