import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import { StyleSheet, Button, ActionSheetIOS } from 'react-native';
import localization from 'localization';
import { levelKeys } from 'components/config';
import Layout from 'components/layout/Layout';

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

    render() {
        const { timer, level, isCanContinue } = this.props;

        return (
            <Layout>
                {isCanContinue ? (
                    <Button
                        onPress={this._onContinueGame}
                        title="Продолжить игру"
                    />
                ) : null}
                <Button
                    onPress={this._onCreateNewGame}
                    title="Новая игра"
                />
            </Layout>
        )
    }

}

const styles = StyleSheet.create({
})

export default MainScreen