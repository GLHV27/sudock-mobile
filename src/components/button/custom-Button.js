import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { customButton as style } from './style';

class CustomButton extends React.Component {
    static propsTypes = {
        title: PropTypes.string,
        subtitle: PropTypes.string,
        buttonStyle: PropTypes.object,
        titleStyle: PropTypes.object,
        subtitleStyle: PropTypes.object,
        iconSubtitle: PropTypes.string,
        onPress: PropTypes.func
    };

    render() {
        const {
            title,
            subtitle,
            buttonStyle,
            containerSubtitleStyle,
            titleStyle,
            iconSubtitle,
            iconSubtitleStyle,
            subtitleStyle,
            onPress = Function.prototype
        } = this.props;

        return (
            <TouchableOpacity
                activeOpacity={0.3}
                onPress={onPress}
            >
                <View
                    style={StyleSheet.flatten([
                        style.buttonStyle,
                        buttonStyle
                    ])}
                >
                    <Text
                        style={StyleSheet.flatten([
                            style.titleStyle,
                            titleStyle
                        ])}
                    >
                        {title}
                    </Text>
                    <View
                        style={StyleSheet.flatten([
                            style.containerSubtitleStyle,
                            containerSubtitleStyle
                        ])}
                    >
                        {iconSubtitle ? (
                            <View
                                style={StyleSheet.flatten([
                                    style.iconSubtitleStyle,
                                    iconSubtitleStyle
                                ])}
                            >
                                <SvgUri
                                    width="100%"
                                    height="100%"
                                    source={iconSubtitle}
                                />
                            </View>
                        ) : null}
                        <Text
                            style={StyleSheet.flatten([
                                style.subTitleStyle,
                                subtitleStyle
                            ])}
                        >
                            {subtitle}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

export default CustomButton;
