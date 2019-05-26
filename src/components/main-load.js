import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react';
import { Font } from 'expo';
import stores from 'stores';
import AppNavigator from 'components/navigator';

@inject(({ mainLoad }) => ({
    loaded: mainLoad.visible,
    setFontsLoaded: mainLoad.setFontsLoaded
}))
@observer
export default class MainLoad extends React.Component {
    async componentDidMount() {
        await Font.loadAsync({
            'ComicSans': require('assets/fonts/ComicSans.ttf'),
            'BrushScript': require('assets/fonts/BrushScript.ttf'),
        });

        this.props.setFontsLoaded();
    }

    _renderLoader() {
        return (
            <View style={style.loader}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        );
    }

    render() {
        return this.props.loaded
                ? <AppNavigator ref={stores.nav.setNavRef} />
                : this._renderLoader()
    }
}

const style = StyleSheet.create({
    loader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
