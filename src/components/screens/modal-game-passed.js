import React, { Component } from 'react';
import { Text, Button, StyleSheet } from 'react-native';
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
                <Text>Passed</Text>
            </CustomModal>
        )
    }

}

const styles = StyleSheet.create({
});

export default ModalGamePassed