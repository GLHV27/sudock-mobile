import { AsyncStorage } from 'react-native';

const PREFIX_KEY = '9e44e3831bfc0ad568da38ac81eb67b6:';

class Storage {
    constructor({ key = '', onLoaded = Function.prototype }) {
        if (!key) {
            console.error('You did not pass the key');
            return;
        }

        this.state = {};

        this.key = `${PREFIX_KEY}${key}`;
        this.onLoaded = onLoaded;

        this._retrieveData();
    }

    setState(data = {}) {
        this.state = {
            ...this.state,
            ...data
        };

        this._setData();
    }

    clear() {
        this.state = {};

        this._setData();
    }

    _retrieveData = async () => {
        try {
            await AsyncStorage.getItem(this.key, this._initState);
        } catch (error) {
            alert('Error: AppStorage - _retrieveData');
        }
    }

    _setData = async () => {
        try {
            await AsyncStorage.setItem(this.key, JSON.stringify(this.state));
        } catch (error) {
            alert('Error: AppStorage - _setData');
        }
    }

    _initState = (err, result) => {
        if (result !== null) {
            this.state = JSON.parse(result);
        }

        this.onLoaded(this.state);
    }
}

export default Storage;
