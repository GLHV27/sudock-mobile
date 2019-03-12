import React from 'react';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react';
import style from './style';
import Cell from '../cell/Cell';
import { NUMBER } from '../config';

@inject(({ game }) => ({
    selected: game.selected,
}))
@observer
export default class Collection extends React.Component {
    _getItemStyle(cellIndex) {
        let style = {};

        if (Math.floor(cellIndex / NUMBER) !== 0) {
            style.borderTopWidth = 1;
        }

        if (cellIndex % NUMBER !== 0) {
            style.borderLeftWidth = 1;
        }

        return style;
    }

    _getSelectedStyle(cellIndex) {
        const { collectionIndex, selected } = this.props;
        return selected.collectionIndex === collectionIndex &&
            selected.cellIndex === cellIndex
                ? style.selected
                : null
    }

    _getHighlightStyle(cell) {
        return cell.highlight ? style.highlight : null;
    }

    _getHighlightByNumberStyle(cell) {
        return cell.isHighlightByNumber ? style.highlightByNumber : null;
    }

    render() {
        const { list, collectionIndex } = this.props;

        return (
            <View style={style.container}>
                {list.map((item, cellIndex) => (
                    <View
                        key={`cell-${collectionIndex}-${cellIndex}`}
                        style={[
                            style.item,
                            this._getItemStyle(cellIndex),
                            this._getHighlightStyle(item),
                            this._getHighlightByNumberStyle(item),
                            this._getSelectedStyle(cellIndex),
                        ]}
                    >
                        <Cell
                            {...item}
                            cellIndex={cellIndex}
                            collectionIndex={collectionIndex}
                        />
                    </View>
                ))}
            </View>
        );
    }
}
