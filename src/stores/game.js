import {observable, computed, action} from 'mobx';
import BasicStore from './basic-store';
import Canvas from './canvas';

const canvas = new Canvas();

class GameStore extends BasicStore {
    constructor(...args) {
        super(...args);
    }

    @observable canvas = [];
    @observable numbers = canvas.getNumbers();
    @observable selected = { collectionIndex: null, cellIndex: null };

    @action onCreate = (level) => {
        this.canvas = canvas.create(level);
        this.selected = { collectionIndex: null, cellIndex: null };
    }

    @action onSelect = (collectionIndex, cellIndex) => {
        this.selected = {
            collectionIndex,
            cellIndex
        };

        this.highlight();
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
        } else {
            cell.number = null;
            cell.isError = false;
            cell.visible = true;
            cell.isGuessed = true;
        }
    }

    highlight() {
        const { collectionIndex, cellIndex } = this.selected;
        const selectedCell = this.canvas[collectionIndex][cellIndex];
        const lineIndexSelectedCell = canvas.getLineIndex(collectionIndex, cellIndex);
        const columnIndexSelectedCell = canvas.getColumnIndex(collectionIndex, cellIndex);

        this.canvas.forEach((collection, i) => {
            collection.forEach((cell, j) => {
                const isIdentical = selectedCell.visible && cell.visible && cell.value === selectedCell.value;
                const lineIndex= canvas.getLineIndex(i, j);
                const columnIndex = canvas.getColumnIndex(i, j);

                cell.highlight = false;
                cell.isHighlightByNumber = false;

                if (isIdentical) {
                    cell.isHighlightByNumber = true;
                }

                if (
                    collectionIndex === i ||
                    lineIndexSelectedCell === lineIndex ||
                    columnIndexSelectedCell === columnIndex
                ) {
                    cell.highlight = true;
                }
            });
        });
    }
}

export default GameStore;
