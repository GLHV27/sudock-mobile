import random from "lodash/random";

const NUMBER = 9;
const LENGTH_IN_ROW = 3;

function _getList() {
    return new Array(NUMBER).fill('').map(() => []);
}

function _getRandomNumber() {
    return random(1, NUMBER);
}

function _getNumber(collectionIndex, cellIndex, canvas) {
    let number;

    do {
        number = _getRandomNumber();
    } while (_checkOnRepeat(number, collectionIndex, cellIndex, canvas));

    return number;
}

function _checkOnRepeat(number, collectionIndex, cellIndex, canvas = []) {
    debugger;

    const maxLength = Math.max(canvas[collectionIndex].length, collectionIndex, cellIndex);
    const lineIndexByCollection = Math.floor(collectionIndex / LENGTH_IN_ROW);
    const columnIndexByCollection = collectionIndex % LENGTH_IN_ROW;

    for (let i = 0; i < maxLength; i++) {
        const lineCollectionIndex = Math.floor(i / LENGTH_IN_ROW) + lineIndexByCollection;
        const columnCollectionIndex = i % LENGTH_IN_ROW + columnIndexByCollection;
        const lineIndex = i % LENGTH_IN_ROW;
        const columnIndex = i % LENGTH_IN_ROW * LENGTH_IN_ROW;


        if (
            canvas[collectionIndex][i] === number
        ) {
            return true;
        }
    }

    return false;
}

function _createCollection(collectionIndex, canvas) {
    const list = [];

    for (let j = 0; j < NUMBER; j++) {
        let number = _getNumber(collectionIndex, j, canvas);

        list.push(number);
    }

    return list;
}

export function createCanvas() {
    return _getList().map((collection, i, canvas) => {
        return _createCollection(i, canvas);
    });
}
