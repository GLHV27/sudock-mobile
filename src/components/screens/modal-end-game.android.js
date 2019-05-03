import React, { Component } from 'react';
import { Text, Button, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react';
import CustomModal from 'components/modal/modal';
import i18n from 'localization';

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
                <Text>{i18n.t('gameOver')}</Text>
                <Text>{i18n.t('modals.textError')}</Text>
                <Button
                    onPress={this._onContinue}
                    title={i18n.t('secondChance')}
                />
                <Button
                    onPress={this._onNewGame}
                    title={i18n.t('newGame')}
                />
            </CustomModal>
        )
    }

}

const styles = StyleSheet.create({
});

export default ModalEndGame