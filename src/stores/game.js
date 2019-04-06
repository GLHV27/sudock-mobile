import {observable, computed, action} from 'mobx';
import BasicStore from './basic-store';
import Canvas from 'stores/helpers/canvas';
import History from 'stores/helpers/history';
import Storage from 'stores/helpers/storage';

const canvas = new Canvas();
const history = new History();

class GameStore extends BasicStore {
    @observable isEnd = false;
    @observable loaded = false;
    @observable isHaveHistory = false;
    @observable canvas = [];
    @observable numbers = canvas.getNumbers();
    @observable selected = { collectionIndex: null, cellIndex: null };
    @observable level = '';
    @observable errors = {};

    constructor(...args) {
        super(...args);

        this.storage = new Storage({
            key: 'game',
            onLoaded: this._initState
        });
    }

    @action _initState = ({
        selected = this.selected,
        canvas = this.canvas,
        level = this.level,
        errors = this.errors
    }) => {
        this.selected = selected;
        this.canvas = canvas;
        this.level = level;
        this.errors = errors;
        this.loaded = true;
    }

    @action onCreate = (level) => {
        this.level = level;
        this.canvas = canvas.create(level);
        this.selected = { collectionIndex: null, cellIndex: null };
        this.errors = { total: 3, count: 0 };
        this.getStore('timer').reset();

        history.clear();
        this._setStorage();
    }

    @action onSelect = (collectionIndex, cellIndex) => {
        this.selected = {
            collectionIndex,
            cellIndex
        };

        this._setStorage();
        canvas.highlight(this.canvas, collectionIndex, cellIndex);
        history.put({selected: this.selected});
        this.isHaveHistory = true;
    }

    @action onWrite = (number) => {
        const { collectionIndex, cellIndex } = this.selected;

        if (cellIndex === null) {
            return;
        }

        const cell = this.canvas[collectionIndex][cellIndex];

        if (cell.visible) {
            return;
        }

        history.put({ canvas: this.canvas });
        this.isHaveHistory = true;

        if (cell.value !== number) {
            cell.isError = true;
            cell.number = number;
            this.errors.count += 1;
        } else {
            cell.number = null;
            cell.isError = false;
            cell.visible = true;
            cell.isGuessed = true;
        }

        if (this.errors.total === this.errors.count) {
            this.isEnd = true;
            return;
        }

        this._setStorage();
    }

    @action onEnd = () => {
        this.isEnd = false;
        this.level = '';
        this.getStore('timer').reset();
    }

    @action onBack = () => {
        ({
            canvas: this.canvas = this.canvas,
            selected: this.selected = this.selected
        } = history.back());

        this.isHaveHistory = history.isEmpty();
    }

    _setStorage() {
        this.storage.setState({
            canvas: this.canvas,
            selected: this.selected,
            level: this.level,
            errors: this.errors
        });
    }
}

export default GameStore;
