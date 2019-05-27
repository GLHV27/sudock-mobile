import {observable, computed, action} from 'mobx';
import BasicStore from './basic-store';
import Canvas from 'stores/helpers/canvas';
import History from 'stores/helpers/history';
import Storage from 'stores/helpers/storage';
import { NUMBER, levelsParams } from "components/config";

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
    @observable usedNumbers = {};
    filledFields = 0;
    totalFields = Math.pow(NUMBER, 4);

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
        filledFields = this.filledFields,
        isCanContinue = this.isCanContinue,
        usedNumbers = this.usedNumbers
    }) => {
        this.selected = selected;
        this.canvas = canvas;
        this.level = level;
        this.errors = errors;
        this.filledFields = filledFields;
        this.isCanContinue = isCanContinue;
        this.usedNumbers = usedNumbers;
        this.loaded = true;
    }

    @action onCreate = (level) => {
        this.level = level;
        this.canvas = canvas.create(level);
        this.isCanContinue = true;
        this.isEnd = false;
        this.filledFields = levelsParams[level].count;
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

        if (this.selected.cellIndex && this.selected.collectionIndex) {
            history.put({selected: this.selected});
            this.isHaveHistory = true;
        }

        this.selected = {
            collectionIndex,
            cellIndex
        };

        this._setStorage();
        canvas.highlight(this.canvas, collectionIndex, cellIndex);
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

        const { isErrorLimitNeeded, isNeedHideUseNumbers } = this.getStore('options');

        history.put({ canvas: this.canvas });
        this.isHaveHistory = true;

        if (cell.value !== number) {
            cell.isError = true;
            cell.number = number;
            isErrorLimitNeeded && (this.errors.count += 1);
        } else {
            cell.number = null;
            cell.isError = false;
            cell.visible = true;
            cell.isGuessed = true;
            this.filledFields += 1;

            isNeedHideUseNumbers && this.checkNumberForUse(number);
        }

        if (
            (isErrorLimitNeeded && this.errors.total <= this.errors.count) ||
            this.totalFields <= this.filledFields
        ) {
            this.onEnd();
            return;
        }

        this._setStorage();
    }

    @action onClose = () => {
        this.isEnd = false;
        this.storage.clear();
    }

    @action onContinue = () => {
        this.errors.count -= 1;
        this.isEnd = false;
        this.getStore('timer').start();
    }

    @action onEnd = () => {
        this.getStore('timer').stop();
        this.isEnd = true;
        this.isCanContinue = false;

        this._addToStatistics();
    }

    @action onBack = () => {
        const { canvas: prevCanvas, selected } = history.back();

        if (prevCanvas) {
            this.canvas = prevCanvas;
        }

        if (selected) {
            this.selected = selected;
            canvas.highlight(this.canvas, this.selected.collectionIndex, this.selected.cellIndex);
        }

        this.isHaveHistory = history.isEmpty();
    }

    @action onClearCell = () => {
        const { collectionIndex, cellIndex } = this.selected;

        if (!collectionIndex || !cellIndex) {
            return;
        }

        const cell = this.canvas[collectionIndex][cellIndex];

        if (cell.visible || !cell.isError) {
            return;
        }

        cell.isError = false;
        cell.number = null;
    }

    @action checkNumberForUse(number) {
        const count = canvas.getNumberOfDigits(this.canvas, number);

        if (count === this.numbers.length) {
            this.usedNumbers[number] = true;
        }
    }

    _setStorage() {
        this.storage.setState({
            canvas: this.canvas,
            selected: this.selected,
            level: this.level,
            errors: this.errors,
            filledFields: this.filledFields,
            isCanContinue: this.isCanContinue,
            usedNumbers: this.usedNumbers
        });
    }

    _addToStatistics() {
        this.getStore('statistics').add(this.level, {
            time: this.getStore('timer').time,
            isWon: this.errors.total !== this.errors.count
        });
    }
}

export default GameStore;
