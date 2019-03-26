import { observable, action } from 'mobx';
import { AsyncStorage } from 'react-native';
import BasicStore from "./basic-store";

const keyApp = '9e44e3831bfc0ad568da38ac81eb67b6';

class Storage extends BasicStore {
    @observable load = false;

    constructor(...args) {
        super(...args);

        this.state = {};

        this._retrieveData();
    }

    setState(data = {}) {
        this.state = {
            ...this.state,
            ...data
        };

        this._setData();
    }

    _retrieveData = async () => {
        try {
            await AsyncStorage.getItem(keyApp, this._initState);
        } catch (error) {
            alert('Error: AppStorage - _retrieveData');
        }
    }

    _setData = async () => {
        try {
            await AsyncStorage.setItem(keyApp, JSON.stringify(this.state), () => {
                console.log(this.state);
            });
        } catch (error) {
            alert('Error: AppStorage - _setData');
        }
    }

    @action _initState = (err, result) => {
        if (result !== null) {
            this.state = JSON.parse(result);
        }

        this.load = true;
    }
}

export default Storage;
