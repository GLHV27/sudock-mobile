import { inject, observer } from 'mobx-react';
import { levelKeys } from 'components/config';
import CommonMainScreen, { injectProps } from './main.common';

@inject(injectProps)
@observer
class MainScreen extends CommonMainScreen {
    _onCreateNewGame = () => {
        this.props.onCreateGame(levelKeys[1]);
        this.props.nav.goTo('game');
    }
}

export default MainScreen;
