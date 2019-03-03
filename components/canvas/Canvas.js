import React from 'react';
import { Text, View } from 'react-native';
import style from './style';
import Collection from "../collection/Collection";

const number = [
    [1,2,3,4,5,6,7,8,9],
    [1,2,3,4,5,6,7,8,9],
    [1,2,3,4,5,6,7,8,9],
    [1,2,3,4,5,6,7,8,9],
    [1,2,3,4,5,6,7,8,9],
    [1,2,3,4,5,6,7,8,9],
    [1,2,3,4,5,6,7,8,9],
    [1,2,3,4,5,6,7,8,9],
    [1,2,3,4,5,6,7,8,9],
];

export default class Canvas extends React.Component {
    render() {
        return (
            <View style={style.container}>
                {number.map((collection, i) => (
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
