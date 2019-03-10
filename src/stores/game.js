import {observable, computed, action} from 'mobx';
import BasicStore from './basic-store';
import Canvas from './canvas';

const canvas = new Canvas();

class GameStore extends BasicStore {
    constructor(...args) {
        super(...args);
    }

    @observable canvas = canvas.create();
    @observable numbers = canvas.getNumbers();
}

export default GameStore;
