import { inject, observer } from 'mobx-react';
import { ActionSheetIOS } from 'react-native';
import i18n from 'localization';
import { levelKeys } from 'components/config';
import CommonMainScreen, { inject as commonInject } from './main.common';

const actionSheetOptions = {
    options: [
        i18n.t('actions.cancel'),
        i18n.t('levels.easy'),
        i18n.t('levels.average'),
        i18n.t('levels.complex'),
        i18n.t('levels.expert'),
    ],
    cancelButtonIndex: 0,
};

@inject(commonInject)
@observer
class MainScreen extends CommonMainScreen {
    _onCreateNewGame = () => {
        ActionSheetIOS.showActionSheetWithOptions(
            actionSheetOptions,
            this._onActionSheet,
        );
    }

    _onActionSheet = (index) => {
        if (index) {
            this.props.onCreateGame(levelKeys[index]);
            this.props.nav.goTo('game');
        }
    }

}

export default MainScreen;
