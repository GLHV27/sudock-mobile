import { createStackNavigator, createAppContainer } from 'react-navigation';
import MainScreen from './screens/main/main';
import GameScreen from 'components/screens/game';
import SettingsScreen from 'components/screens/settings';

const StackNavigator = createStackNavigator({
    main: {
        screen: MainScreen,
    },
    game: {
        screen: GameScreen,
    },
    // settings: {
    //     screen: SettingsStackNavigator
    // }
})

const SettingsStackNavigator = createStackNavigator({
    main: {
        screen: SettingsScreen
    }
}, {
    mode: 'modal'
})

export default createAppContainer(StackNavigator)
