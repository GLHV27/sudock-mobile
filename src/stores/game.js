import {observable, computed, action} from 'mobx';
import BasicStore from './basic-store';
import { createCanvas } from './canvas';

class GameStore extends BasicStore {
    constructor(...args) {
        super(...args);

    }

    @observable canvas = createCanvas();
}

export default GameStore;
