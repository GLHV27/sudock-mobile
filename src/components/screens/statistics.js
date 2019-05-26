import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { inject, observer } from 'mobx-react';;
import { ButtonGroup } from 'react-native-elements';
import { ListItem } from 'react-native-elements/src';
import { levelsParams } from 'components/config';
import i18n from 'localization';

const list = [
    {
        title: i18n.t('totalGames'),
        dataKey: 'total',
    },
    {
        title: i18n.t('bestTime'),
        dataKey: 'bestTime',
    },
    {
        title: i18n.t('averageTime'),
        dataKey: 'averageTime',
    },
    {
        title: i18n.t('wonGames'),
        dataKey: 'countWon',
    },
];

@inject(({ statistics }) => ({
    data: statistics.data,
    clear: statistics.clear
}))
@observer
class StatisticsScreen extends Component {
    static navigationOptions = {
        title: i18n.t('statistics')
    }

    static defaultProps = {
        selectedIndex: 0
    }

    constructor(props) {
        super(props);

        this.state = {
            selectedIndex: props.selectedIndex
        };

        this.buttons = Object.keys(levelsParams).map(key => i18n.t(`levels.${key}`));
    }

    _updateIndex = (selectedIndex) => {
        this.setState({ selectedIndex });
    }

    _getKey() {
        return Object.keys(levelsParams)[this.state.selectedIndex];
    }

    _onClear = () => {
        this.props.clear();
    }

    render() {
        const { selectedIndex } = this.state;
        const data = this.props.data[this._getKey()];

        return (
            <View style={styles.container}>
                <ButtonGroup
                    textStyle={styles.textButton}
                    buttonStyle={styles.button}
                    buttons={this.buttons}
                    selectedIndex={selectedIndex}
                    onPress={this._updateIndex}
                />
                <View style={styles.list}>
                    {list.map((item, i) => (
                        <ListItem
                            key={i}
                            title={item.title}
                            rightTitle={data[item.dataKey]}
                            topDivider={i === 0}
                            bottomDivider={true}
                        />
                    ))}
                </View>
                <TouchableOpacity
                    onPress={this._onClear}
                >
                    <Text style={styles.clear}>{i18n.t('resetStatistics')}</Text>
                </TouchableOpacity>
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
    clear: {
        paddingTop: 10,
        paddingRight: 10,
        textAlign: 'right',
    },
    button: {
        paddingTop: 6,
        paddingBottom: 6,
    },
    textButton: {
        fontSize: 13
    }
});

export default StatisticsScreen
