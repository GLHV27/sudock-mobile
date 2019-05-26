import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import MainScreen from './screens/main/main';
import GameScreen from 'components/screens/game';
import SettingsScreen from 'components/screens/settings';
import OptionsScreen from 'components/screens/options';
import StatisticsScreen from 'components/screens/statistics';
import i18n from 'localization';

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
            tabBarLabel: i18n.t('main')
        }
    },
    settings: {
        screen: SettingsNavigator,
        navigationOptions: {
            tabBarLabel: i18n.t('settings')
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
