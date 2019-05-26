import React, { Component } from 'react';
import { View } from 'react-native';
import i18n from 'localization';
import Layout from 'components/layout/Layout';
import Button from 'components/button/button';
import ModalMainLoader from 'components/screens/modal-main-loader';
import style from './style';

export const injectProps = ({ nav, game, timer }) => ({
    nav,
    onCreateGame: game.onCreate,
    time: timer.format,
    level: game.level,
    isCanContinue: game.isCanContinue
});

class MainScreen extends Component {
    _onContinueGame = () => {
        this.props.nav.goTo('game');
    }

    render() {
        const { time, level, isCanContinue } = this.props;

        return (
            <Layout>
                <View style={style.container}>
                    {isCanContinue ? (
                        <View style={style.item}>
                            <Button
                                onPress={this._onContinueGame}
                                title={`${i18n.t('continueGame')}\n (${time} - ${i18n.t(`levels.${level}`)})`}
                            />
                        </View>
                    ) : null}
                    <View style={style.item}>
                        <Button
                            onPress={this._onCreateNewGame}
                            title={i18n.t('newGame')}
                        />
                    </View>
                </View>
                <ModalMainLoader />
            </Layout>
        )
    }
}

export default MainScreen;
