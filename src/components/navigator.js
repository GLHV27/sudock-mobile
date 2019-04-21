import { createStackNavigator, createAppContainer } from 'react-navigation';
import MainScreen from './screens/main';
import GameScreen from './screens/game';


const StackNavigator = createStackNavigator({
    main: {
        screen: MainScreen,
    },
    game: {
        screen: GameScreen,
    },
})

export default createAppContainer(StackNavigator)
