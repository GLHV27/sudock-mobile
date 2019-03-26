import NavigationStore from './navigation';
import GameStore from './game';
import Timer from './timer';
import Storage from './storage';

const stores = {};

stores.storage = new Storage(stores);
stores.game = new GameStore(stores);
stores.timer = new Timer(stores);
stores.nav = new NavigationStore(stores);

export default stores;
