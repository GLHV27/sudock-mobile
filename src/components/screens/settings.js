import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Layout from 'components/layout/Layout';
import i18n from 'localization';

class SettingsScreen extends Component {
    static navigationOptions = {
        title: i18n.t('settings')
    }

    render() {
        return (
            <Layout>
                
            </Layout>
        )
    }

}

const styles = StyleSheet.create({
});

export default SettingsScreen
