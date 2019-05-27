import { observable, action } from 'mobx';
import BasicStore from "./basic-store";
import Formatter from 'utils/formatter';
import Storage from 'stores/helpers/storage';

const SECOND = 1000; // milliseconds per second

class TimerStore extends BasicStore {
    @observable pause = false;
    @observable time = 0;
    @observable format = Formatter.format(this.time);
    @observable id = null;

    constructor(...args) {
        super(...args);

        this.storage = new Storage({
            key: 'timer',
            onLoaded: this._initState
        });
    }

    @action _initState = ({ timer = this.time }) => {
        this.time = timer;
        this.format = Formatter.format(this.time);
    }

    @action _step = (time = this.time + 1) => {
        this.time = time;
        this.format = Formatter.format(this.time);

        this.storage.setState({ timer: this.time });
    }

    reset() {
        this._step(0);
    }

    @action start = () => {
        if (this.id || !this.getStore('options').isNeedTimer) {
            return;
        }

        this.id = setInterval(this._step, SECOND);
    }

    @action stop = () => {
        clearInterval(this.id);
        this.id = null;
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
