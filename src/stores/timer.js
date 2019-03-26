import { observable, action } from 'mobx';
import BasicStore from "./basic-store";
import Formatter from 'utils/formatter';

class TimerStore extends BasicStore {
    @observable pause = false;
    @observable time = 0;
    @observable format = Formatter.format(this.time);
    @observable id = null;

    @action _step = (time = this.time + 1) => {
        this.time = time;
        this.format = Formatter.format(this.time);

        this.getStore('storage').setState({ timer: this.time });
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

    @action playing = () => {
        this.pause = false;
        this.start();
    }

    @action pause = () => {
        this.pause = true;
        this.stop();
    }
}

export default TimerStore;
