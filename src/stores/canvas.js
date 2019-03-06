import random from "lodash/random";

const NUMBER = 9;
const LENGTH_IN_ROW = 3;

class Canvas {
    _getMatrix() {
        this.canvas = new Array(this.number).fill('').map(() => []);

        this.canvas.forEach((collection, i) => {
            this._fillCollection(collection, i);
        });

        return this.canvas;
    }

    _getNumber(collectionIndex, cellIndex) {
        let number;

        // do {
        //     number = random(1, this.number);
        // } while (this._checkOnRepeat(number, collectionIndex, cellIndex));
        // console.log(number, collectionIndex, cellIndex);
        // return number;

        return 0;
    }

    _checkOnRepeat(number, collectionIndex, cellIndex) {
        const lengthInLine = (collectionIndex % LENGTH_IN_ROW) * LENGTH_IN_ROW + (cellIndex % LENGTH_IN_ROW);
        const lengthInColumn =  Math.floor(collectionIndex / LENGTH_IN_ROW) + Math.ceil(cellIndex / LENGTH_IN_ROW);
        const maxLength = Math.max(this.canvas[collectionIndex].length, lengthInLine, lengthInColumn);
        const lineIndexByCollection = Math.floor(collectionIndex / LENGTH_IN_ROW);
        const columnIndexByCollection = collectionIndex % LENGTH_IN_ROW;

        for (let i = 0; i < maxLength; i++) {
            const lineCollectionIndex = Math.floor(i / LENGTH_IN_ROW) + lineIndexByCollection;
            const columnCollectionIndex = i % LENGTH_IN_ROW + columnIndexByCollection;
            const lineIndex = i % LENGTH_IN_ROW;
            const columnIndex = i % LENGTH_IN_ROW * LENGTH_IN_ROW;

            if (
                this.canvas[collectionIndex][i] === number ||
                this.canvas[lineCollectionIndex][lineIndex] === number ||
                this.canvas[columnCollectionIndex][columnIndex] === number
            ) {
                return true;
            }
        }

        return false;
    }

    _fillCollection(collection, collectionIndex) {
        for (let i = 0; i < this.number; i++) {
            collection.push(this._getNumber(collectionIndex, i));
        }
    }

    create(number = NUMBER) {
        this.number = number;
        return this._getMatrix();
    }
}

export default new Canvas();
