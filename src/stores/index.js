import NavigationStore from './navigation';
import GameStore from './game';

const stores = {};

stores.game = new GameStore(stores);
stores.nav = new NavigationStore(stores);

export default stores;
