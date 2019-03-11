import React from 'react';
import {inject, observer} from 'mobx-react';
import { View } from 'react-native';
import style from './style';
import Collection from "../collection/Collection";

@inject(({ game }) => ({
    canvas: game.canvas,
}))
@observer
export default class Canvas extends React.Component {
    render() {
        const { canvas } = this.props;

        return (
            <View style={style.container}>
                {canvas.map((collection, collectionIndex) => (
                    <View
                        key={`collection-${collectionIndex}`}
                        style={style.item}
                    >
                        <Collection
                            collectionIndex={collectionIndex}
                            list={collection}
                        />
                    </View>
                ))}
            </View>
        );
    }
}
