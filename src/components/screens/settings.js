import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { StyleSheet, View } from 'react-native';
import { ListItem } from 'react-native-elements/src';
import i18n from 'localization';

const list = [
    {
        title: 'Параметры',
        nav: 'options',
        leftIcon: {
            name: 'settings'
        }
    },
    {
        title: 'Статистика',
        nav: 'statistics',
        leftIcon: {
            type: 'font-awesome',
            name: 'bar-chart'
        }
    }
];

@inject(({ nav }) => ({
    nav
}))
@observer
class SettingsScreen extends Component {
    static navigationOptions = {
        title: i18n.t('settings')
    }

    _onPress(index) {
        this.props.nav.goTo(list[index].nav);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.group}>
                    {list.map((item, i) => (
                        <ListItem
                            key={i}
                            title={item.title}
                            leftIcon={item.leftIcon}
                            topDivider={true}
                            bottomDivider={i !== 0}
                            onPress={() => this._onPress(i) }
                        />
                    ))}
                </View>
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
    group: {
        paddingTop: 10,
        paddingBottom: 10
    }
});

export default SettingsScreen
