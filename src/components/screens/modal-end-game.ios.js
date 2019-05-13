import React, { Component } from 'react';
import { Text, Button, StyleSheet, ActionSheetIOS } from 'react-native';
import { inject, observer } from 'mobx-react';
import i18n from 'localization';
import { levelKeys } from 'components/config';
import CustomModal from 'components/modal/modal';

const actionSheetOptions = {
    options: [
        i18n.t('actions.cancel'),
        i18n.t('levels.easy'),
        i18n.t('levels.average'),
        i18n.t('levels.complex'),
        i18n.t('levels.expert'),
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
                <Text>{i18n.t('gameOver')}</Text>
                <Text>{i18n.t('modals.textError')}</Text>
                <Button
                    onPress={this._onContinue}
                    title={i18n.t('secondChance')}
                />
                <Button
                    onPress={this._onCreateNewGame}
                    title={i18n.t('newGame')}
                />
            </CustomModal>
        )
    }

}

const styles = StyleSheet.create({
});

export default ModalEndGame