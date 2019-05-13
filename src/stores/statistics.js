import { observable, action } from 'mobx';
import BasicStore from "./basic-store";
import Storage from 'stores/helpers/storage';
import Formatter from 'utils/formatter';
import { levelsParams } from 'components/config';

class StatisticsStore extends BasicStore {
    @observable easy = [];
    @observable average = [];
    @observable complex = [];
    @observable expert = [];
    @observable data = {};

    constructor(...args) {
        super(...args);

        this.storage = new Storage({
            key: 'statistics',
            onLoaded: this._initState
        });
    }

    @action _initState = ({
        easy = this.easy,
        average = this.average,
        complex = this.complex,
        expert = this.expert
    }) => {
        this.easy = easy;
        this.average = average;
        this.complex = complex;
        this.expert = expert;

        this._toCalc();
    }

    _toCalc() {
        for (let key in levelsParams) {
            this._levelCalc(key);
        }
    }

    @action _levelCalc = (key) => {
        let bestTime = 'Infinity';
        let totalTime = 0;
        let countWon = 0;

        this[key].forEach(({ time, isWon }) => {
            if (time < bestTime) {
                bestTime = time;
            }

            if (isWon) {
                countWon += 1;
            }

            totalTime += time;
        });

        this.data[key] = {
            bestTime: Formatter.format(bestTime === 'Infinity' ? 0 : bestTime),
            averageTime: Formatter.format(Math.round(totalTime ? (totalTime / this[key].length) : 0)),
            total: this[key].length || '0',
            countWon: countWon || '0'
        };
    }

    @action add = (key, data) => {
        this[key].push(data);

        this.storage.setState({
            easy: this.easy,
            average: this.average,
            complex: this.complex,
            expert: this.expert
        });

        this._toCalc();
    }

    @action clear = () => {
        this.storage.clear();

        for (let key in levelsParams) {
            this[key] = [];
        }

        this._toCalc();
    }
}

export default StatisticsStore;
