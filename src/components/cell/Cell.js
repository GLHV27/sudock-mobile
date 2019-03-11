import React from 'react';
import { inject, observer } from 'mobx-react';
import { Text, TouchableOpacity } from 'react-native';
import style from './style';

@inject(({ game }) => ({
    game,
}))
@observer
export default class Cell extends React.Component {
    _onSelect = () => {
        const { collectionIndex, cellIndex, game } = this.props;
        game.select(collectionIndex, cellIndex);
    }

    render() {
        const { visible } = this.props;
        const invisible = visible ? null : style.invisible;

        return (
            <TouchableOpacity
                style={[style.default]}
                activeOpacity={1}
                onPress={this._onSelect}
            >
                <Text
                    style={[
                        style.text,
                        invisible
                    ]}
                >
                    {this.props.value}
                </Text>
            </TouchableOpacity>
        );
    }
}
