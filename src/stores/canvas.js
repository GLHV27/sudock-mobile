import random from "lodash/random";

const NUMBER = 3;

class Canvas {
	constructor() {
		this.numbers = [];
	}

	_getList() {
		return new Array(this.number * this.number).fill('').map(() => []);
	}

    _createMatrix() {
        this.canvas = this._getList();
		this.numbers = this._getNumbers();

		for (let i = 0; i < this.numbers.length; i++) {
			this._fillLine(this.canvas[i], i);
		}

		this._randomMatrix();

        return this.canvas;
    }

	_getNumbers() {
		let numbers = new Array(this.number * this.number).fill('').map((item, i) => (i + 1));
		this._randomList(numbers);
		return numbers;
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
			const line = this.canvas[areaIndex * this.number + areaIndex];
			this.canvas[areaIndex * this.number + areaIndex] = this.canvas[areaIndex * this.number + index];
			this.canvas[areaIndex * this.number + index] = line;
			// columns
			const column = this.canvas.map(line => line[areaIndex * this.number + areaIndex]);
			this.canvas.forEach((line, i) => line[areaIndex * this.number + areaIndex] = this.canvas[i][areaIndex * this.number + index]);
			this.canvas.forEach((line, i) => line[areaIndex * this.number + index] = column[i]);
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
			collection.push(this.canvas[lineIndex][columnIndex]);
		}
	}

	_convertToCollections() {
		const collections = this._getList();

		collections.forEach((collection, i) => {
			this._fillCollection(collection, i);
		});

		return collections;
	}

    create(number = NUMBER) {
        this.number = number;
		this._createMatrix();
        return this._convertToCollections();
    }
}

export default new Canvas();
