import React from 'react';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import MainScreen from './screens/main/main';
import GameScreen from 'components/screens/game';
import SettingsScreen from 'components/screens/settings';
import OptionsScreen from 'components/screens/options';
import StatisticsScreen from 'components/screens/statistics';
import i18n from 'localization';
import SvgUri from 'react-native-svg-uri';

const images = {
    game: require('assets/icons/game.svg'),
    settings: require('assets/icons/settings.svg')
};

const SettingsNavigator = createStackNavigator({
    settings: {
        screen: SettingsScreen
    },
    options: {
        screen: OptionsScreen
    },
    statistics: {
        screen: StatisticsScreen
    }
});

const MainNavigator = createBottomTabNavigator({
    main: {
        screen: MainScreen,
        navigationOptions: {
            tabBarLabel: i18n.t('main'),
            tabBarIcon: ({ focused, tintColor }) => (
                <SvgUri
                    width="30"
                    height="30"
                    source={images.game}
                />
            )
        }
    },
    settings: {
        screen: SettingsNavigator,
        navigationOptions: {
            tabBarLabel: i18n.t('settings'),
            tabBarIcon: ({ focused, tintColor }) => (
                <SvgUri
                    width="20"
                    height="20"
                    source={images.settings}
                />
            )
        }
    }
});

const StackNavigator = createStackNavigator({
    main: {
        screen: MainNavigator,
        navigationOptions: {
            header: null,
            headerBackTitle: i18n.t('back'),
        }
    },
    game: {
        screen: GameScreen,
    }
});

export default createAppContainer(StackNavigator)
