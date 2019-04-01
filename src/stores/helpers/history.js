import { observable, computed, action } from 'mobx';

class History {
    stack = [];

    put(data) {
        stack.push(data);
    }
}

export default History;
