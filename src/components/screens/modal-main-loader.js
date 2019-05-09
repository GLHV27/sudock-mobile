import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react';
import CustomModal from 'components/modal/modal';

const DURATION = 2000;

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
                <ActivityIndicator size="large" color="#00ff00" />
            </CustomModal>
        )
    }

}

const styles = StyleSheet.create({
});

export default ModalMainLoader;
