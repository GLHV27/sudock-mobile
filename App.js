import React from 'react';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import stores from './src/stores';
import MainLoad from './src/components/main-load';

configure({
    enforceActions: 'always'
});

export default class App extends React.Component {
    render() {
        return (
            <Provider {...stores}>
                <MainLoad />
            </Provider>
        );
    }
}
