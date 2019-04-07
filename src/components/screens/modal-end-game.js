import React, { Component } from 'react';
import { Text, Button, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react';
import CustomModal from 'components/modal/modal';

@inject(({ nav, game, timer }) => ({
    isEnd: game.isEnd,
    onEnd: game.onEnd,
    onContinue: game.onContinue,
    time: timer.time,
}))
@observer
class ModalEndGame extends Component {
    _onContinue = () => {
        this.props.onContinue();
    }

    _onNewGame = () => {

    }

    render() {
        const { isEnd, time } = this.props;

        return (
            <CustomModal visible={isEnd}>
                <Text>Игра окончена</Text>
                <Text>Вы совершили 3 ошибки и проиграли эту игру</Text>
                <Button
                    onPress={this._onContinue}
                    title="Второй шанс"
                />
                <Button
                    onPress={this._onNewGame}
                    title="Новая игра"
                />
            </CustomModal>
        )
    }

}

const styles = StyleSheet.create({
});

export default ModalEndGame