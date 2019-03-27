export default class BasicStore {
    constructor(stores) {
        this._stores = stores;
    }

    getStore(storeName) {
        return this._stores[storeName];
    }

    getStorage() {
        return this.getStore('storage');
    }

    storageLoaded(data) {
        for (let nameStore in this._stores) {
            const store = this._stores[nameStore];

            if (store.initState) {
                store.initState(data);
            }
        }
    }
}
