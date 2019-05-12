import { createStackNavigator, createAppContainer } from 'react-navigation';
import MainScreen from './screens/main/main';
import GameScreen from 'components/screens/game';
import SettingsScreen from 'components/screens/settings';
import OptionsScreen from 'components/screens/options';
import StatisticsScreen from 'components/screens/statistics';

const StackNavigator = createStackNavigator({
    main: {
        screen: MainScreen
    },
    game: {
        screen: GameScreen
    },
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

export default createAppContainer(StackNavigator)
