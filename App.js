import React from 'react';
import Layout from './components/layout/Layout';
import Canvas from './components/canvas/Canvas';
import TopBar from './components/top-bar/TopBar';

export default class App extends React.Component {
  render() {
    return (
      <Layout>
        <TopBar />
        <Canvas />
      </Layout>
    );
  }
}
