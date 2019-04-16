import React, { Component } from 'react';
import { Text, Button, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react';
import CustomModal from 'components/modal/modal';

@inject(({ game }) => ({
    isEnd: game.isEnd,
    errors: game.errors,
    onClose: game.onClose,
    onContinue: game.onContinue
}))
@observer
class ModalEndGame extends Component {
    _onContinue = () => {
        this.props.onContinue();
    }

    _onNewGame = () => {
        
    }

    render() {
        const { isEnd, errors: { total: totalErrors, count: countErrors } } = this.props;
        const isVisible = isEnd && totalErrors === countErrors;

        return (
            <CustomModal visible={isVisible}>
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