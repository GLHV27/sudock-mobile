import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { inject, observer } from 'mobx-react';
import CustomModal from 'components/modal/modal';

const DURATION = 5000;

@inject(({ game }) => ({
    loaded: game.loaded
}))
@observer
class ModalMainLoader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: true,
            animationType: 'none'
        };

        this.duration();
    }

    duration() {
        setTimeout(() => {
            this.setState({ animationType: 'fade' });
        }, DURATION / 2);

        setTimeout(() => {
            this.setState({ visible: false });
        }, DURATION);
    }

    render() {
        const visible = this.state.visible && this.props.loaded;

        return (
            <CustomModal
                visible={visible}
                transparent={false}
                animationType={this.state.animationType}
            >
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>
            </CustomModal>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff'
    }
});

export default ModalMainLoader;
