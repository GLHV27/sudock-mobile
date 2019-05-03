import { createStackNavigator, createAppContainer } from 'react-navigation';
import MainScreen from './screens/main/main';
import GameScreen from 'components/screens/game';
import SettingsScreen from 'components/screens/settings';

const StackNavigator = createStackNavigator({
    main: {
        screen: MainScreen,
    },
    game: {
        screen: GameScreen
    },
    settings: {
        screen: SettingsScreen
    }
});

export default createAppContainer(StackNavigator)
