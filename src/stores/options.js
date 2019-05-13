import { observable, action } from 'mobx';
import BasicStore from "./basic-store";
import Storage from 'stores/helpers/storage';

class OptionsStore extends BasicStore {
    @observable isNeedTimer = true;

    constructor(...args) {
        super(...args);

        this.storage = new Storage({
            key: 'options',
            onLoaded: this._initState
        });
    }

    @action _initState = ({ isNeedTimer = this.isNeedTimer }) => {
        this.isNeedTimer = isNeedTimer;
    }
}

export default OptionsStore;
