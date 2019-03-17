import {inject, observer} from "mobx-react";
import React from "react";
import {Text, View} from "react-native";
import style from "./style";

@inject(({ timer }) => ({
    time: timer.format,
    onStart: timer.start,
    onStop: timer.stop,
}))
@observer
export default class Timer extends React.Component {
    componentDidMount() {
        this.props.onStart();
    }

    componentWillUnmount() {
        this.props.onStop();
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