import React, {useState, useEffect} from 'react';
import { Button, View, Text, StyleSheet, StatusBar, Image } from 'react-native';
import { pxToDp } from '../../../utils/stylesKits'
import { Input, Icon, withBadge } from 'react-native-elements';
import {postAction} from '@/utils/request'
import THBtn from '@/components/THButton';
// import axios from 'axios'
const url = {
    getValidCode: '/user/login'
}

export default function Index(props: any) {
    const [phoneNum, setPhoneNum] = useState("")
    const [phoneErrMsg, setPhoneErrMsg] = useState("")

    const handlePhoneNumChange = (e: any) => {
        e = e.replace(/[^\d]/g, '')
        e.length < 12 ? setPhoneNum(e) : ""
    }

    // * 手机号码点击完成的时候触发
    // const handleSubmitEdit = async ({nativeEvent: {text}}) => {
    //     if (new RegExp(/^1[3|4|5|6|7|8|9][0-9]\d{8}$/).test(text)) {
    //            setPhoneErrMsg("")
    //     } else {
    //         setPhoneErrMsg('请输入正确的手机号码!')
    //     }
    // }

    // * 获取验证码
    const handleGetValidateCode = () => {
        if (new RegExp(/^1[3|4|5|6|7|8|9][0-9]\d{8}$/).test(phoneNum)) {
            setPhoneErrMsg("")
            postAction(url.getValidCode, {phone: phoneNum}).then((res: any) => {
                console.info(res)
            })
     } else {
         setPhoneErrMsg('请输入正确的手机号码!')
     }
    }

    useEffect(() => {
        // Toast.message('卧槽', 100)
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
            <Image source={require('../../../pictures/profileBackground.jpg')} style={{ width: '100%', height: pxToDp(200) }} />
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
                    // onSubmitEditing={handleSubmitEdit}
                    leftIcon={{
                        name:'phone', type:'font-awesome', color:'#ccc', size:pxToDp(20)
                    }}
                />
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <THBtn 
                        style={{width: '85%', height: 40, overflow: 'hidden', borderRadius: 20}}
                        onPress={handleGetValidateCode}
                    >点击获取验证码</THBtn>
                </View>
            </View>
        </View>
    )
}
