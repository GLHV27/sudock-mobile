import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import { StyleSheet, Button, ActionSheetIOS } from 'react-native';
import Layout from '../layout/Layout';

const keyLevels = {
    1: 'easy',
    2: 'normal',
    3: 'complex',
    4: 'expert'
};

const actionSheetOptions = {
    options: ['Отмена', 'Легка', 'Средняя', 'Сложная', 'Экспертная'],
    cancelButtonIndex: 0,
};

@inject(({ nav, game }) => ({
    nav,
    onCreateGame: game.onCreate
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

    _onActionSheet = (index) => {
        if (index) {
            this.props.onCreateGame(keyLevels[index]);
            this.props.nav.goTo('game');
        }
    }

    render() {
        return (
            <Layout>
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