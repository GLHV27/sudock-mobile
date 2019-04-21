import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react';
import CustomModal from 'components/modal/modal';
import Button from 'components/button/button';

@inject(({ nav, game }) => ({
    nav,
    isEnd: game.isEnd,
    onClose: game.onClose
}))
@observer
class ModalGamePassed extends Component {
    onClickButton = () => {
        this.props.onClose();
        this.props.nav.goTo('main');
    }

    render() {
        const { isEnd } = this.props;

        return (
            <CustomModal visible={isEnd} transparent={false}>
                <Button title={'На главную'} onPress={this.onClickButton} />
            </CustomModal>
        )
    }

}

const styles = StyleSheet.create({
});

export default ModalGamePassed