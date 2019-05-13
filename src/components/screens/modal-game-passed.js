import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react';
import CustomModal from 'components/modal/modal';
import Button from 'components/button/button';
import i18n from 'localization';

@inject(({ nav, game }) => ({
    nav,
    isEnd: game.isEnd,
    errors: game.errors,
    onClose: game.onClose
}))
@observer
class ModalGamePassed extends Component {
    onClickButton = () => {
        this.props.onClose();
        this.props.nav.goTo('main');
    }

    render() {
        const { isEnd, errors: { total: totalErrors, count: countErrors } } = this.props;
        const isVisible = isEnd && totalErrors > countErrors;

        return (
            <CustomModal visible={isVisible} transparent={false}>
                <Button title={i18n.t('toMain')} onPress={this.onClickButton} />
            </CustomModal>
        )
    }

}

const styles = StyleSheet.create({
});

export default ModalGamePassed