import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Layout from 'components/layout/Layout';
import Canvas from 'components/canvas/Canvas';
import Numbers from 'components/numbers/numbers';
import TopBar from 'components/top-bar/top-bar';
import BottomBar from 'components/bottom-bar/bottom-bar';
import ModalEndGame from 'components/screens/modal-end-game';

class GameScreen extends Component {
    static navigationOptions = {
        title: 'Game'
    }

    render() {
        return (
            <Layout>
                <TopBar />
                <Canvas />
                <BottomBar />
                <Numbers />
                <ModalEndGame />
            </Layout>
        )
    }

}

const styles = StyleSheet.create({
});

export default GameScreen