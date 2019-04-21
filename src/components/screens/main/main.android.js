import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import { StyleSheet, Button } from 'react-native';
import { levelKeys } from 'components/config';
import Layout from 'components/layout/Layout';

@inject(({ nav, game }) => ({
    nav,
    onCreateGame: game.onCreate,
    time: timer.time,
    level: game.level
}))
@observer
class MainScreen extends Component {
    static navigationOptions = {
        title: 'Main'
    }

    _onCreateNewGame = () => {
        this.props.onCreateGame(levelKeys[1]);
        this.props.nav.goTo('game');
    }

    render() {
        const { timer, level } = this.props;

        return (
            <Layout>
                {level ? (
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