import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { inject, observer } from 'mobx-react';
import CustomModal from 'components/modal/modal';

@inject(({ game }) => ({
    isEnd: game.isEnd
}))
@observer
class ModalGamePassed extends Component {
    render() {
        const { isEnd } = this.props;

        return (
            <CustomModal visible={isEnd} transparent={false}>
                <Button title={'На главную'} />
            </CustomModal>
        )
    }

}

const styles = StyleSheet.create({
});

export default ModalGamePassed