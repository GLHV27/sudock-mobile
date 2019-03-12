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
        game.onSelect(collectionIndex, cellIndex);
    }

    render() {
        const { visible, number, value, isError, isGuessed } = this.props;
        const errorStyle = isError ? style.error : null;
        const visibleStyle = (visible || isError) ? style.visible : null;
        const guessedStyle = isGuessed ? style.guessed : null;

        return (
            <TouchableOpacity
                style={[style.default]}
                activeOpacity={1}
                onPress={this._onSelect}
            >
                <Text
                    style={[
                        style.text,
                        visibleStyle,
                        errorStyle,
                        guessedStyle
                    ]}
                >
                    {number || value}
                </Text>
            </TouchableOpacity>
        );
    }
}
