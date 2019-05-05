import {inject, observer} from "mobx-react";
import React from "react";
import { AppState, Text, View } from "react-native";
import style from "./style";

@inject(({ timer, game }) => ({
    isEnd: game.isEnd,
    time: timer.format,
    onStart: timer.start,
    onStop: timer.stop,
}))
@observer
export default class Timer extends React.Component {
    componentDidMount() {
        this.props.onStart();
        AppState.addEventListener('change', this._handleAppStateChange);
    }

    componentWillUnmount() {
        this.props.onStop();
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    _handleAppStateChange = (nextAppState) => {
        if (this.props.isEnd) {
            return;
        }

        if (nextAppState === 'active') {
            this.props.onStart();
        } else {
            this.props.onStop();
        }
    }

    render() {
        const { time } = this.props;

        return (
            <View style={style.container}>
                <Text>{time}</Text>
            </View>
        );
    }
}
