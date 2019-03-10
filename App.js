import React from 'react';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import stores from './src/stores';
import Layout from './src/components/layout/Layout';
import Canvas from './src/components/canvas/Canvas';
import TopBar from './src/components/top-bar/TopBar';
import Numbers from './src/components/numbers/numbers';

configure({
    enforceActions: 'always'
});

export default class App extends React.Component {
    render() {
        return (
            <Provider {...stores}>
                <Layout>
                    <TopBar />
                    <Canvas />
                    <Numbers />
                </Layout>
            </Provider>
        );
    }
}
