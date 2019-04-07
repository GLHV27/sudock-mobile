import React from 'react';
import { Modal, View, Text } from 'react-native';
import style from './style';

export default class CustomModal extends React.Component {
    render() {
        const { visible, animationType = 'fade', children } = this.props;

        return (
            <Modal
                visible={visible}
                transparent={true}
                animationType={animationType}
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
