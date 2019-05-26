import { observable, action } from 'mobx';
import BasicStore from "./basic-store";

const DURATION_DELAY = 500;

class MainLoadingStore extends BasicStore {
    @observable visible = false;
    @observable gameLoaded = false;
    @observable fontsLoaded = false;
    @observable delay = false;

    constructor(...args) {
        super(...args);

        setTimeout(this.startDelay, DURATION_DELAY);
    }

    @action setVisible = () => {
        if (this.gameLoaded && this.fontsLoaded && this.delay) {
            this.visible = true;
        }
    }

    @action setGameLoaded = () => {
        this.gameLoaded = true;

        this.setVisible();
    }

    @action setFontsLoaded = () => {
        this.fontsLoaded = true;

        this.setVisible();
    }

    @action startDelay = () => {
        this.delay = true;

        this.setVisible();
    }
}

export default MainLoadingStore;
