import React from 'react';
import { Modal, View, Text } from 'react-native';
import style from './style';

export default class CustomModal extends React.Component {
    render() {
        const { isVivible, animationType = 'fade' } = this.props;

        return (
            <Modal
                visible={isVivible}
                transparent={true}
                animationType={animationType}
            >
                <View style={style.background}>
                    <View style={style.container}>
                        <Text>123456</Text>
                    </View>
                </View>
            </Modal>
        );
    }
}
