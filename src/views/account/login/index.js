import React, {useState, useEffect} from 'react';
import { Button, View, Text, StyleSheet, StatusBar, Image } from 'react-native';
import { pxToDp } from '../../../utils/stylesKits.js'
import { Input, Icon } from 'react-native-elements';

export default function Index(props) {
    const [phoneNum, setPhoneNum] = useState("")

    const handlePhoneNumChange = (e) => {
        e = e.replace(/[^\d]/g, '')
        e.length < 12 ? setPhoneNum(e) : ""
    }

    useEffect(() => {
        // console.info(phoneNum)
    }, [phoneNum])

    return (
        <View>
            {/* 
                // * 状态栏
                backgroundColor 修改颜色
                translucent 将app的核心部分整体往上移
            */}
            <StatusBar backgroundColor="transparent" translucent={true} />
            {/* 
                // * rn中单位一般是dp, 但是设计图上是px
                // * 需要转换单位
            */}
            <Image source={require('../../../pictures/demo2.jpg')} style={{ width: '100%', height: pxToDp(200) }} />
            <View style={{ padding: pxToDp(20) }}>
                <View style={{marginBottom: pxToDp(30)}}><Text style={{ fontSize: pxToDp(25), color: '#888', fontWeight: '600' }}>手机号登陆注册</Text></View>
                <Input
                    placeholder='请输入手机号码'
                    keyboardType='phone-pad'
                    value={phoneNum}
                    inputStyle={{color: "#333"}}
                    onChangeText={handlePhoneNumChange}
                    maxLength={11}
                    leftIcon={{
                        name:'phone', type:'font-awesome', color:'#ccc', size:pxToDp(20)
                    }}
                />
            </View>
        </View>
    )
}
