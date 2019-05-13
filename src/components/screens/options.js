import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { FlatList, StyleSheet, View, Switch, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import i18n from 'localization';

const list = [
    {
        title: 'Таймер',
        keyData: 'isNeedTimer',
        topDivider: true
    },
    {
        title: 'Лимит ошибок',
        description: 'Практика без ошибок&nbsp;&mdash; это единственная конечная цель! Улучшите свои навыки и&nbsp;точность с&nbsp;помощью ограничения ошибок до&nbsp;3&nbsp;за&nbsp;игру.',
        keyData: 'isErrorLimitNeeded'
    },
    {
        title: 'Скрывать использованные цифры',
        description: 'Скрывать цифры, уже размещенные в&nbsp;9&nbsp;различных ячейках.',
        keyData: 'isNeedHideUseNumbers',
        topDivider: true
    },
    {
        title: 'Выделять повторы',
        description: 'Выделять повторяющиеся цифры в&nbsp;строке, столбце и&nbsp;блоке.',
        keyData: 'isNeedToHighlightRepeats',
        topDivider: true
    },
    {
        title: 'Выделять области',
        description: 'Выделять блок, строку и&nbsp;столбец выбранной ячейки.',
        keyData: 'isNeedToSelectAreas',
        topDivider: true
    },
    {
        title: 'Выделять одинаковые цифры',
        description: 'При выборе ячейки с&nbsp;цифрой, выделять одинаковые значения на&nbsp;игровом поле.',
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
                ? <Text style={styles.description}><>{description}</></Text>
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
