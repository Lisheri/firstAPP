import React, {useState, useEffect} from 'react';
import { Button, View, Text, StyleSheet, StatusBar, Image } from 'react-native';
import { pxToDp } from '../../../utils/stylesKits.js'
import { Input, Icon } from 'react-native-elements';
import {postAction} from '@/utils/request.js'
// import axios from 'axios'
const url = {
    getValidCode: '/user/login'
}

export default function Index(props) {
    const [phoneNum, setPhoneNum] = useState("")
    const [phoneErrMsg, setPhoneErrMsg] = useState("")

    const handlePhoneNumChange = (e) => {
        e = e.replace(/[^\d]/g, '')
        e.length < 12 ? setPhoneNum(e) : ""
    }

    // * 手机号码点击完成的时候触发
    const handleSubmitEdit = async ({nativeEvent: {text}}) => {
        // console.info(text)
        if (new RegExp(/^1[3|4|5|6|7|8|9][0-9]\d{8}$/).test(text)) {
               setPhoneErrMsg("")
               const res = await postAction(url.getValidCode, {phone: text})
               console.info(res)
        } else {
            setPhoneErrMsg('请输入正确的手机号码!')
        }
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
                <View style={{marginBottom: pxToDp(30)}}><Text style={{ fontSize: pxToDp(25), color: '#888', fontWeight: '600' }}>手机号登录注册</Text></View>
                <Input
                    placeholder='请输入手机号码'
                    keyboardType='phone-pad'
                    value={phoneNum}
                    inputStyle={{color: "#333"}}
                    onChangeText={handlePhoneNumChange}
                    maxLength={11}
                    errorMessage={phoneErrMsg}
                    onSubmitEditing={handleSubmitEdit}
                    leftIcon={{
                        name:'phone', type:'font-awesome', color:'#ccc', size:pxToDp(20)
                    }}
                />
            </View>
        </View>
    )
}
