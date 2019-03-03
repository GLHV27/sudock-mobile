import GameStore from './game';

const stores = {};

stores.game = new GameStore(stores);

export default stores;
