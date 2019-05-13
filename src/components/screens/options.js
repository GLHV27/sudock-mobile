import React, { Component } from 'react';
import { StyleSheet, View, Switch } from 'react-native';
import { ListItem } from 'react-native-elements/src';
import i18n from 'localization';

const list = [
    {
        title: 'Таймер'
    }
];

class OptionsScreen extends Component {
    static navigationOptions = {
        title: i18n.t('options')
    }

    render() {
        return (
            <View style={styles.container}>
                {list.map((item, i) => (
                    <View style={styles.item}>
                        <ListItem
                            title={item.title}
                            rightTitle={<Switch />}
                            containerStyle={styles.itemContainer}
                            topDivider={i === 0}
                            bottomDivider={true}
                        />
                    </View>
                ))}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#f5f5f5',
        paddingTop: 10,
    },
    item: {},
    itemContainer: {
        paddingTop: 8,
        paddingBottom: 8,
    }
});

export default OptionsScreen
