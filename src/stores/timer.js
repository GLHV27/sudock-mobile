import {observable, action} from 'mobx';
import BasicStore from "./basic-store";
import Formatter from 'utils/formatter';

class Timer extends BasicStore {
    @observable pause = false;
    @observable time = 0;
    @observable format = Formatter.format(this.time);
    @observable id = null;

    @action _step = (time = this.time + 1) => {
        this.time = time;
        this.format = Formatter.format(this.time);
    }

    reset() {
        this._step(0);
    }

    @action start = () => {
        this.id = setInterval(this._step, 1000);
    }

    @action stop = () => {
        clearInterval(this.id);
    }

    @action pause = () => {
        this.pause = true;
    }
}

export default Timer;
