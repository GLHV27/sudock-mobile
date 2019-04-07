import React, { Component } from 'react';
import { Text, Button, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react';
import CustomModal from 'components/modal/modal';

@inject(({ nav, game, timer }) => ({

}))
@observer
class ModalGamePassed extends Component {
    render() {
        const { isEnd, time } = this.props;

        return (
            <CustomModal visible={isEnd}>

            </CustomModal>
        )
    }

}

const styles = StyleSheet.create({
});

export default ModalGamePassed