import React from 'react';
import { Modal, View, Text } from 'react-native';
import { def, full } from './style';

export default class CustomModal extends React.Component {
    render() {
        const {
            visible,
            animationType = 'fade',
            transparent = true,
            onRequestClose = Function.prototype,
            children
        } = this.props;
        const style = transparent ? def : full;

        return (
            <Modal
                visible={visible}
                transparent={transparent}
                animationType={animationType}
                onRequestClose={onRequestClose}
            >
                <View style={style.background}>
                    <View style={style.container}>
                        {children}
                    </View>
                </View>
            </Modal>
        );
    }
}
