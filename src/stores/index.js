import NavigationStore from './navigation';
import GameStore from './game';
import TimerStore from './timer';
import StatisticsStore from './statistics';
import OptionsStore from './options';
import MainLoadStore from './main-load';

const stores = {};

stores.mainLoad = new MainLoadStore(stores);
stores.game = new GameStore(stores);
stores.timer = new TimerStore(stores);
stores.nav = new NavigationStore(stores);
stores.statistics = new StatisticsStore(stores);
stores.options = new OptionsStore(stores);

export default stores;
