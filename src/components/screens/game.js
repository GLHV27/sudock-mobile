import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Layout from '../layout/Layout';
import Canvas from '../canvas/Canvas';
import Numbers from '../numbers/numbers';


class GameScreen extends Component {
    static navigationOptions = {
        title: 'Game'
    }

    render() {
        return (
            <Layout>
                <Canvas />
                <Numbers />
            </Layout>
        )
    }

}

const styles = StyleSheet.create({
});

export default GameScreen