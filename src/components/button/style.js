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
            borderRadius: 30,
            paddingTop: 4,
            paddingBottom: 8,
        },
        title: {
            fontFamily: 'ComicSans'
        }
    })
};

export const customButton = StyleSheet.create({
    buttonStyle: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 30,
        backgroundColor: '#4990e2',
    },
    titleStyle: {
        fontFamily: 'ComicSans',
        fontSize: 24,
        color: '#ffffff',
    },
    containerSubtitleStyle: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 16,
    },
    iconSubtitleStyle: {
        position: 'absolute',
        top: 3,
        left: 0,
        width: 12,
        height: 12
    },
    subTitleStyle: {
        fontFamily: 'ComicSans',
        fontSize: 12,
        color: '#ffffff',
    }
});