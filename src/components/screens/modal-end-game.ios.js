import React, { Component } from 'react';
import { Text, Button, StyleSheet, ActionSheetIOS } from 'react-native';
import { inject, observer } from 'mobx-react';
import localization from 'localization';
import { levelKeys } from 'components/config';
import CustomModal from 'components/modal/modal';

const actionSheetOptions = {
    options: [
        localization.actions.cancel,
        localization.levels.easy,
        localization.levels.average,
        localization.levels.complex,
        localization.levels.expert,
    ],
    cancelButtonIndex: 0
};

@inject(({ game, nav }) => ({
    nav,
    isEnd: game.isEnd,
    errors: game.errors,
    onClose: game.onClose,
    onContinue: game.onContinue,
    onCreateGame: game.onCreate,
}))
@observer
class ModalEndGame extends Component {
    _onContinue = () => {
        this.props.onContinue();
    }

    _onCreateNewGame = () => {
        ActionSheetIOS.showActionSheetWithOptions(
            actionSheetOptions,
            this._onActionSheet,
        );
    }

    _onActionSheet = (index) => {
        if (index) {
            this.props.onCreateGame(levelKeys[index]);
            this.props.nav.goTo('game');
        }
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
                    onPress={this._onCreateNewGame}
                    title="Новая игра"
                />
            </CustomModal>
        )
    }

}

const styles = StyleSheet.create({
});

export default ModalEndGame