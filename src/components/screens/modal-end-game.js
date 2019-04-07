import React, { Component } from 'react';
import { Text, Button, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react';
import CustomModal from 'components/modal/modal';

@inject(({ nav, game, timer }) => ({
    nav,
    isEnd: game.isEnd,
    onEnd: game.onEnd,
    time: timer.time,
}))
@observer
class ModalEndGame extends Component {
    _onEnd = () => {
        this.props.onEnd();
        this.props.nav.goTo('main');
    }

    render() {
        const { isEnd, time } = this.props;

        return (
            <CustomModal visible={isEnd}>
                <Text>Игра закончина</Text>
                <Text>{time}</Text>
                <Button
                    onPress={this._onEnd}
                    title="На главную"
                />
            </CustomModal>
        )
    }

}

const styles = StyleSheet.create({
});

export default ModalEndGame