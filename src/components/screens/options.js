import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { FlatList, StyleSheet, View, Switch, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import i18n from 'localization';

const list = [
    {
        title: i18n.t('timer'),
        keyData: 'isNeedTimer',
        topDivider: true
    },
    {
        title: i18n.t('errorLimit'),
        description: i18n.t('descriptionOptions.errorLimit'),
        keyData: 'isErrorLimitNeeded'
    },
    {
        title: i18n.t('hideUsedNumbers'),
        description: i18n.t('descriptionOptions.hideUsedNumbers'),
        keyData: 'isNeedHideUseNumbers',
        topDivider: true
    },
    {
        title: i18n.t('highlightReplays'),
        description: i18n.t('descriptionOptions.highlightReplays'),
        keyData: 'isNeedToHighlightRepeats',
        topDivider: true
    },
    {
        title: i18n.t('selectAreas'),
        description: i18n.t('descriptionOptions.selectAreas'),
        keyData: 'isNeedToSelectAreas',
        topDivider: true
    },
    {
        title: i18n.t('selectSameNumbers'),
        description: i18n.t('descriptionOptions.selectSameNumbers'),
        keyData: 'isNeedToAllocateSameNumbers',
        topDivider: true
    }
];

@inject(({ options }) => ({
    changeData: options.changeData,
    isNeedTimer: options.isNeedTimer,
    isErrorLimitNeeded: options.isErrorLimitNeeded,
    isNeedHideUseNumbers: options.isNeedHideUseNumbers,
    isNeedToHighlightRepeats: options.isNeedToHighlightRepeats,
    isNeedToSelectAreas: options.isNeedToSelectAreas,
    isNeedToAllocateSameNumbers: options.isNeedToAllocateSameNumbers
}))
@observer
class OptionsScreen extends Component {
    static navigationOptions = {
        title: i18n.t('options')
    }

    _actionSwitch = (value, key) => {
        this.props.changeData(key, value);
    }

    _keyExtractor = (item, index) => index;

    _renderItem = ({ item: { title, keyData, description, topDivider }}) => (
        <View style={styles.item}>
            <ListItem
                title={title}
                rightTitle={(
                    <Switch
                        value={this.props[keyData]}
                        onValueChange={(value) => this._actionSwitch(value, keyData)}
                    />
                )}
                containerStyle={styles.itemContainer}
                topDivider={topDivider}
                bottomDivider={true}
            />
            {description
                ? <Text style={styles.description}>{description}</Text>
                : null
            }
        </View>
    );

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    extraData={[]}  // hack for update render
                    data={list}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                />
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
        paddingBottom: 10,
    },
    item: {},
    itemContainer: {
        paddingTop: 8,
        paddingBottom: 8,
    },
    description: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 14,
        paddingRight: 14,
    }
});

export default OptionsScreen
