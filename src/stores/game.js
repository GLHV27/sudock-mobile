import {observable, computed, action} from 'mobx';
import BasicStore from './basic-store';
import Canvas from './helpers/canvas';

const canvas = new Canvas();

class GameStore extends BasicStore {
    @observable canvas = [];
    @observable numbers = canvas.getNumbers();
    @observable selected = { collectionIndex: null, cellIndex: null };
    @observable level = '';
    @observable errors = {};

    @action initState = ({
        selected = this.selected,
        canvas = this.canvas,
        level = this.level
    }) => {
        this.selected = selected;
        this.canvas = canvas;
        this.level = level;
    }

    @action onCreate = (level) => {
        const timer = this.getStore('timer');

        timer.reset();
        this.level = level;
        this.canvas = canvas.create(level);
        this.selected = { collectionIndex: null, cellIndex: null };
        this.errors = { total: 3, count: 0 };

        this.getStorage().setState({ level: this.level });
    }

    @action onSelect = (collectionIndex, cellIndex) => {
        this.selected = {
            collectionIndex,
            cellIndex
        };

        this.getStorage().setState({ selected: this.selected });
        canvas.highlight(this.canvas, collectionIndex, cellIndex);
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

        this.getStorage().setState({ canvas: this.canvas });
    }
}

export default GameStore;
