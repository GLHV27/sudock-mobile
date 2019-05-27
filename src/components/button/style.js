import { StyleSheet } from 'react-native';

export const sizes = {
    normal: StyleSheet.create({
        button: {},
        title: {
            fontSize: 20
        }
    }),
    large: {
        button: {},
        title: {
            fontSize: 24
        }
    }
};

export const styles = {
    solid: StyleSheet.create({
        button: {
            backgroundColor: '#4990e2',
            borderRadius: 30
        },
        title: {
            fontFamily: 'ComicSans'
        }
    })
};
