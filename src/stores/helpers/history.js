import { toJS } from 'mobx';

class History {
    stack = [];

    _clone(data = {}) {
        let clone = {};

        for (let key in data) {
            clone[key] = toJS(data[key]);
        }

        return clone;
    }

    put(data = {}) {
        this.stack.push(this._clone(data));
    }

    clear() {
        this.stack = [];
    }

    back() {
        const lastIndex = this.stack.length - 1;
        const lastStep = this.stack[lastIndex];
        this.stack = this.stack[0, lastIndex];

        return lastStep;
    }

    isEmpty() {
        return !!this.stack.length;
    }
}

export default History;
