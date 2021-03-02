import React, {Component} from 'react';

import {View, Text} from 'react-native';

import { inject, observer } from 'mobx-react';

@inject("RootStore")
@observer
class Btn extends Component {
    handleChangeName = () => {
        this.props.RootStore.changeTest('测试响应式');
    }

    render() {
        return (
            <View>
                <Text onPress={this.handleChangeName}>Btn: {this.props.RootStore.testName}</Text>
            </View>
        )
    }
}

export default Btn