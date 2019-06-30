import React, { Component } from 'react';
import { View, ImageBackground } from 'react-native';
import i18n from 'localization';
import Layout from 'components/layout/Layout';
import Button from 'components/button/button';
import CustomButton from 'components/button/custom-Button';
import Logo from 'components/logo/logo';
import style from './style';

const images = {
    bgr: require('assets/bgr/main-bgr.bmp'),
    clock: require('assets/icons/clock.svg')
};

export const injectProps = ({ nav, game, timer, options }) => ({
    nav,
    onCreateGame: game.onCreate,
    time: timer.format,
    level: game.level,
    isCanContinue: game.isCanContinue,
    isNeedTimer: options.isNeedTimer
});

class MainScreen extends Component {
    _onContinueGame = () => {
        this.props.nav.goTo('game');
    }

    _getTimer() {
        if (!this.props.isNeedTimer) {
            return '';
        }

        return `${this.props.time} - `;
    }

    render() {
        const { level, isCanContinue } = this.props;

        return (
            <Layout>
                <ImageBackground
                    source={images.bgr}
                    style={style.bgr}
                />
                <View style={style.container}>
                    <Logo />
                    {isCanContinue ? (
                        <View style={style.item}>
                            <CustomButton
                                onPress={this._onContinueGame}
                                title={i18n.t('continueGame')}
                                iconSubtitle={images.clock}
                                subtitle={`${this._getTimer()}${i18n.t(`levels.${level}`)}`}
                            />
                        </View>
                    ) : null}
                    <View style={style.item}>
                        <Button
                            onPress={this._onCreateNewGame}
                            title={i18n.t('newGame')}
                            size={'large'}
                        />
                    </View>
                </View>
            </Layout>
        )
    }
}

export default MainScreen;
