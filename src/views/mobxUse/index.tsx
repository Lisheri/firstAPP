import React, { useState, useEffect } from 'react';
import { Provider, inject, observer, useObserver } from 'mobx-react'
import {
    View,
    Text,
    Dimensions, // * 用于获取屏幕宽高
    TouchableOpacity, // * 用于点击事件
    StyleSheet,
} from 'react-native';

@inject('RootStore')
@observer
class Test extends React.Component {

    // const [count, setCount] = useState(0);

    // useEffect(() => {
    //     console.info(count)
    //     console.info(props.RootStore.name)
    // }, [count])

    constructor(props) {
        super()
        console.info(props)
        this.state = {
            count: 0,
        }
        this.handlePlus = this.handlePlus.bind(this);
        this.handleReduce = this.handleReduce.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        const vm = this;
        this.styles = StyleSheet.create({
            button: {
                alignItems: "center",
                backgroundColor: "#DDDDDD",
                padding: 10,
                width: props.screenWidth / 5,
                height: 50,
                fontSize: 16
            },
        });
    }

    handlePlus = () => {
        // setCount(count + 1);
        this.setState({
            count: this.state.count + 1
        });
    }

    handleReduce = () => {
        // setCount(count - 1);
        this.setState({
            count: this.state.count -1
        })
    }

    handleChangeName = () => {
        // this.props.RootStore.changeName(`悟空${this.state.count}`)
        this.props.RootStore.changeName('卧槽')
    }

    
    
    render() {
        // console.info(this.props)
        return (<View style={{ width: this.props.screenWidth, height: this.props.screenHeight / 6, backgroundColor: 'green' }}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
            <TouchableOpacity style={this.styles.button} onPress={this.handlePlus}><Text>{`点击+1`}</Text></TouchableOpacity>
            <TouchableOpacity style={this.styles.button} onPress={this.handleReduce}><Text>{`点击-1`}</Text></TouchableOpacity>
            <TouchableOpacity style={this.styles.button} onPress={this.handleChangeName}><Text>{`点击改名`}</Text></TouchableOpacity>
        </View>
        <Text>{this.state.count}</Text>
        {this.state.count > 10 ? <Text>罗云大帝发育</Text> : <Text>罗云大帝出生</Text>}
        <View>
            <Text>{this.props.RootStore.name}</Text>
        </View>
    </View>)
    }
}
export default Test;
// export default inject("RootStore")(observer(Test))