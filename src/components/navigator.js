import { createStackNavigator, createAppContainer } from 'react-navigation';
import MainScreen from 'components/screens/main';
import GameScreen from 'components/screens/game';


const StackNavigator = createStackNavigator({
    main: {
        screen: MainScreen,
    },
    game: {
        screen: GameScreen,
    },
})

export default createAppContainer(StackNavigator)
