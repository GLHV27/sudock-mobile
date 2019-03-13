import React from 'react';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import stores from './src/stores';
import AppNavigator from './src/components/navigator';

configure({
    enforceActions: 'always'
});

export default class App extends React.Component {
    render() {
        return (
            <Provider {...stores}>
                <AppNavigator ref={stores.nav.setNavRef} />
            </Provider>
        );
    }
}
