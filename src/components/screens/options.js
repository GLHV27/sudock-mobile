import React, { Component } from 'react';
import { StyleSheet, View, Switch } from 'react-native';
import i18n from 'localization';

class OptionsScreen extends Component {
    static navigationOptions = {
        title: i18n.t('options')
    }

    render() {
        return (
            <View style={styles.container}>
                <Switch />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#f5f5f5'
    },
});

export default OptionsScreen
