import random from "lodash/random";

const NUMBER = 3;
const levelsParams = {
    easy: {
    	count: 38,
		countVisibleInCollection: 5
    },
    normal: {
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
		this.numbers = [];
	}

	_getList() {
		return new Array(this.number * this.number).fill('').map(() => []);
	}

    _createMatrix() {
        this.matrix = this._getList();
		this.numbers = this.getNumbers();

        this._randomList(this.numbers);

		for (let i = 0; i < this.numbers.length; i++) {
			this._fillLine(this.matrix[i], i);
		}

		this._randomMatrix();

        return this.matrix;
    }

	_randomList(list) {
		for (let i = 0; i < list.length - 1; i++) {
			const index = random(i + 1, list.length - 1);
			const number = list[i];
			list[i] = list[index];
			list[index] = number;
		}
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
			const lineIndex = Math.floor(collectionIndex / this.number) * this.number + Math.floor(i / this.number);
			const columnIndex = collectionIndex % this.number * this.number + i % this.number;
			collection.push({
				visible: false,
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

    getNumbers() {
        return new Array(this.number * this.number).fill('').map((item, i) => (i + 1));
    }

    create(level = 'normal', number = NUMBER) {
        this.number = number;
        this.level = level;

		this._createMatrix();
        this._convertToCollections();
        this._showForLevel();

        return this.canvas;
    }
}

export default Canvas;
