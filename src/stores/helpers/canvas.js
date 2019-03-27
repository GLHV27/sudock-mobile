import random from "lodash/random";
import shuffle from "lodash/shuffle";

const NUMBER = 3;
const levelsParams = {
    easy: {
    	count: 38,
		countVisibleInCollection: 5
    },
    average: {
        count: 30,
        countVisibleInCollection: 4
    },
	complex: {
        count: 25,
        countVisibleInCollection: 3
    },
	expert: {
        count: 20,
        countVisibleInCollection: 3
    }
};

class Canvas {
	constructor() {
        this.number = NUMBER;
		this.numbers = [];
	}

	_getList() {
		return new Array(this.number * this.number).fill('').map(() => []);
	}

    _createMatrix() {
        this.matrix = this._getList();
		this.numbers = shuffle(this.getNumbers());

		for (let i = 0; i < this.numbers.length; i++) {
			this._fillLine(this.matrix[i], i);
		}

		this._randomMatrix();

        return this.matrix;
    }

	_randomMatrix() {
		for (let i = 0; i < this.numbers.length - 1; i++) {
			const areaIndex = Math.floor(i / this.number);
			const index = random(0, this.number - 1);
			// lines
			const line = this.matrix[areaIndex * this.number + areaIndex];
			this.matrix[areaIndex * this.number + areaIndex] = this.matrix[areaIndex * this.number + index];
			this.matrix[areaIndex * this.number + index] = line;
			// columns
			const column = this.matrix.map(line => line[areaIndex * this.number + areaIndex]);
			this.matrix.forEach((line, i) => line[areaIndex * this.number + areaIndex] = this.matrix[i][areaIndex * this.number + index]);
			this.matrix.forEach((line, i) => line[areaIndex * this.number + index] = column[i]);
		}
	}

    _getNumber(lineIndex, cellIndex) {
		const numberIndex = (lineIndex * this.number + lineIndex / this.number + cellIndex) % (this.number * this.number);

		return this.numbers[Math.floor(numberIndex)];
    }

    _fillLine(line, lineIndex) {
        for (let i = 0; i < this.numbers.length; i++) {
			line.push(this._getNumber(lineIndex, i));
        }
    }

	_fillCollection(collection, collectionIndex) {
		for (let i = 0; i < this.numbers.length; i++) {
			const lineIndex = this.getLineIndex(collectionIndex, i);
			const columnIndex = this.getColumnIndex(collectionIndex, i);
			collection.push({
				visible: false,
				isError: false,
				isGuessed: false,
                highlight: false,
                isHighlightByNumber: false,
				number: null,
				value: this.matrix[lineIndex][columnIndex]
			});
		}
	}

	_convertToCollections() {
		this.canvas = this._getList();

        this.canvas.forEach((collection, i) => {
			this._fillCollection(collection, i);
		});
	}

	_showForLevel() {
		const levelParams = levelsParams[this.level];
		const visibleNumbers = this._getList();
		let i = 0;

		while (i < levelParams.count) {
            const collectionIndex = random(0, this.numbers.length - 1);
            const cellIndex = random(0, this.numbers.length - 1);

            if (
				visibleNumbers[collectionIndex].length < levelParams.countVisibleInCollection &&
				visibleNumbers[collectionIndex].indexOf(cellIndex) === -1
			) {
                this.canvas[collectionIndex][cellIndex].visible = true;
                visibleNumbers[collectionIndex].push(cellIndex);
                i += 1;
			}
		}
	}

    getNumbers(number = this.number) {
        return new Array(number * number).fill('').map((item, i) => (i + 1));
    }

    getLineIndex(collectionIndex, cellIndex) {
		return Math.floor(collectionIndex / this.number) * this.number + Math.floor(cellIndex / this.number);
	}

    getColumnIndex(collectionIndex, cellIndex) {
		return collectionIndex % this.number * this.number + cellIndex % this.number;
	}

    highlight(canvas, collectionIndex, cellIndex) {
        const selectedCell = canvas[collectionIndex][cellIndex];
        const lineIndexSelectedCell = this.getLineIndex(collectionIndex, cellIndex);
        const columnIndexSelectedCell = this.getColumnIndex(collectionIndex, cellIndex);

        canvas.forEach((collection, i) => {
            collection.forEach((cell, j) => {
                const isIdentical = selectedCell.visible && cell.visible && cell.value === selectedCell.value;
                const lineIndex= this.getLineIndex(i, j);
                const columnIndex = this.getColumnIndex(i, j);

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

    create(level = 'average', number = NUMBER) {
        this.number = number;
        this.level = level;

		this._createMatrix();
        this._convertToCollections();
        this._showForLevel();

        return this.canvas;
    }
}

export default Canvas;
