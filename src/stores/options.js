import { observable, action } from 'mobx';
import BasicStore from "./basic-store";
import Storage from 'stores/helpers/storage';

class OptionsStore extends BasicStore {
    @observable isNeedTimer = true;
    @observable isErrorLimitNeeded = true;
    @observable isNeedHideUseNumbers = true;
    @observable isNeedToHighlightRepeats = true;
    @observable isNeedToSelectAreas = true;
    @observable isNeedToAllocateSameNumbers = true;

    constructor(...args) {
        super(...args);

        this.storage = new Storage({
            key: 'options',
            onLoaded: this._initState
        });
    }

    @action _initState = ({
        isNeedTimer = this.isNeedTimer,
        isErrorLimitNeeded = this.isErrorLimitNeeded,
        isNeedHideUseNumbers = this.isNeedHideUseNumbers,
        isNeedToHighlightRepeats = this.isNeedToHighlightRepeats,
        isNeedToSelectAreas = this.isNeedToSelectAreas,
        isNeedToAllocateSameNumbers = this.isNeedToAllocateSameNumbers
    }) => {
        this.isNeedTimer = isNeedTimer;
        this.isErrorLimitNeeded = isErrorLimitNeeded;
        this.isNeedHideUseNumbers = isNeedHideUseNumbers;
        this.isNeedToHighlightRepeats = isNeedToHighlightRepeats;
        this.isNeedToSelectAreas = isNeedToSelectAreas;
        this.isNeedToAllocateSameNumbers = isNeedToAllocateSameNumbers;
    }

    @action changeData = (key, value) => {
        this[key] = value;

        this._setStorage();
    }

    _setStorage() {
        this.storage.setState({
            isNeedTimer: this.isNeedTimer,
            isErrorLimitNeeded: this.isErrorLimitNeeded,
            isNeedHideUseNumbers: this.isNeedHideUseNumbers,
            isNeedToHighlightRepeats: this.isNeedToHighlightRepeats,
            isNeedToSelectAreas: this.isNeedToSelectAreas,
            isNeedToAllocateSameNumbers: this.isNeedToAllocateSameNumbers
        });
    }
}

export default OptionsStore;
