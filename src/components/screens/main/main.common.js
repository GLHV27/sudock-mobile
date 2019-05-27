import React, { Component } from 'react';
import { View } from 'react-native';
import i18n from 'localization';
import Layout from 'components/layout/Layout';
import Button from 'components/button/button';
import ModalMainLoader from 'components/screens/modal-main-loader';
import style from './style';

export const injectProps = ({ nav, game, timer, options }) => ({
    nav,
    onCreateGame: game.onCreate,
    time: timer.format,
    level: game.level,
    isCanContinue: game.isCanContinue,
    isNeedTimer: options.isNeedTimer,
});

class MainScreen extends Component {
    static navigationOptions = {
        headerBackTitle: i18n.t('back'),
        headerStyle: {
            borderBottomColor: 'transparent',
        }
    }

    _onContinueGame = () => {
        this.props.nav.goTo('game');
    }

    _onSettings = () => {
        this.props.nav.goTo('settings');
    }

    _getTimer() {
        if (!this.props.isNeedTimer) {
            return '';
        }

        return `${this.props.time} - `;
    }

    render() {
        const { level, isCanContinue } = this.props;

        return (
            <Layout>
                <ModalMainLoader />
                {isCanContinue ? (
                    <View style={style.item}>
                        <Button
                            onPress={this._onContinueGame}
                            title={`${i18n.t('continueGame')}\n (${this._getTimer()}${i18n.t(`levels.${level}`)})`}
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

export default MainScreen;
