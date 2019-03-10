import React from 'react';
import { View } from 'react-native';
import style from './style';
import Cell from '../cell/Cell';

export default class Collection extends React.Component {
    _getItemStyle(j) {
        let style = {};

        // if (j < 3) {
        //     style.borderTopColor = 'transparent';
        // }
        //
        // if (j % 3 === 0) {
        //     style.borderLeftColor = 'transparent';
        // }

        return style;
    }

    render() {
        const { list, i } = this.props;

        return (
            <View style={style.container}>
                {list.map((item, j) => (
                    <View
                        key={`cell-${i}-${j}`}
                        style={[style.item, this._getItemStyle(j)]}
                    >
                        <Cell
                            {...item}
                        />
                    </View>
                ))}
            </View>
        );
    }
}
