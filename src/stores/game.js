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
    @observable isCanContinue = false;
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
        errors = this.errors,
        isCanContinue = this.isCanContinue
    }) => {
        this.selected = selected;
        this.canvas = canvas;
        this.level = level;
        this.errors = errors;
        this.isCanContinue = isCanContinue;
        this.loaded = true;
    }

    @action onCreate = (level) => {
        this.level = level;
        this.canvas = canvas.create(level);
        this.isCanContinue = true;
        this.selected = { collectionIndex: null, cellIndex: null };
        this.errors = { total: 3, count: 0 };
        this.getStore('timer').reset();

        history.clear();
        this._setStorage();
    }

    @action onSelect = (collectionIndex, cellIndex) => {
        if (
            this.selected.collectionIndex === collectionIndex &&
            this.selected.cellIndex === cellIndex
        ) {
            return;
        }

        history.put({selected: this.selected});
        this.selected = {
            collectionIndex,
            cellIndex
        };

        this._setStorage();
        canvas.highlight(this.canvas, collectionIndex, cellIndex);
        this.isHaveHistory = true;
    }

    @action onWrite = (number) => {
        const { collectionIndex, cellIndex } = this.selected;

        if (cellIndex === null) {
            return;
        }

        const cell = this.canvas[collectionIndex][cellIndex];

        if (cell.visible || cell.number === number) {
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

        if (this.errors.total <= this.errors.count) {
            this.getStore('timer').stop();
            this.isEnd = true;
            return;
        }

        this._setStorage();
    }

    @action onEnd = () => {
        this.isEnd = false;
        this.isCanContinue = false;
        this.storage.clear();
    }

    @action onBack = () => {
        const { canvas: cnvs, selected } = history.back();

        if (cnvs) {
            this.canvas = cnvs;
        }

        if (selected) {
            this.selected = selected;
            canvas.highlight(this.canvas, this.selected.collectionIndex, this.selected.cellIndex);
        }

        this.isHaveHistory = history.isEmpty();
    }

    @action onClearCell = () => {
        const { collectionIndex, cellIndex } = this.selected;
        const cell = this.canvas[collectionIndex][cellIndex];

        if (cell.visible || !cell.isError) {
            return;
        }

        cell.isError = false;
        cell.number = null;
    }

    _setStorage() {
        this.storage.setState({
            canvas: this.canvas,
            selected: this.selected,
            level: this.level,
            errors: this.errors,
            isCanContinue: this.isCanContinue
        });
    }
}

export default GameStore;
