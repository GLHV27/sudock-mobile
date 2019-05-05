import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import {StyleSheet, Button, View} from 'react-native';
import { levelKeys } from 'components/config';
import Layout from 'components/layout/Layout';
import i18n from 'localization';
import style from "./style";

@inject(({ nav, game, timer }) => ({
    nav,
    onCreateGame: game.onCreate,
    time: timer.format,
    level: game.level,
    isCanContinue: game.isCanContinue
}))
@observer
class MainScreen extends Component {
    static navigationOptions = {
        headerBackTitle: i18n.t('back')
    }

    _onContinueGame = () => {
        this.props.nav.goTo('game');
    }

    _onCreateNewGame = () => {
        this.props.onCreateGame(levelKeys[1]);
        this.props.nav.goTo('game');
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

const styles = StyleSheet.create({
})

export default MainScreen