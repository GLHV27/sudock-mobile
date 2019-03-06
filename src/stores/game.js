import {observable, computed, action} from 'mobx';
import BasicStore from './basic-store';
import canvas from './canvas';

class GameStore extends BasicStore {
    constructor(...args) {
        super(...args);
    }

    @observable canvas = canvas.create();
}

export default GameStore;
