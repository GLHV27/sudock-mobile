import React from 'react';
import {inject, observer} from 'mobx-react';
import { View } from 'react-native';
import style from './style';
import Collection from "../collection/Collection";

@inject('game')
@observer
export default class Canvas extends React.Component {
    render() {
        const { canvas } = this.props.game;

        return (
            <View style={style.container}>
                {canvas.map((collection, i) => (
                    <View
                        key={`collection-${i}`}
                        style={style.item}
                    >
                        <Collection
                            i={i}
                            list={collection}
                        />
                    </View>
                ))}
            </View>
        );
    }
}
