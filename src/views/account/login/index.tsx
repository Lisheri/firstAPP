import React, { useState, useEffect, useMemo, memo } from 'react';
import { Button, View, Text, StyleSheet, StatusBar, Image, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { pxToDp } from '@/utils/stylesKits'
import { Input, Icon, withBadge } from 'react-native-elements';
import { postAction } from '@/utils/request'
import THBtn from '@/components/THButton';
import Login from './login'
import { debug } from 'react-native-reanimated';
// import { Toast } from '@/utils/Toast'
import {Toast} from 'teaset';
// import axios from 'axios'
const url = {
    getValidCode: '/user/login'
}

const styles = StyleSheet.create({
    input: {
        borderStyle: 'solid',
        borderWidth: pxToDp(1),
        borderColor: 'black',
        height: pxToDp(40),
        width: '85%',
        marginTop: pxToDp(20)
    },
    container: {
        flex: 1,
        paddingHorizontal: pxToDp(20),
        // paddingTop: 20,
    },
})

export default function Index(props: any): JSX.Element {
    const [showLogin, setShowLogin] = useState(false);
    const [phoneNum, setPhoneNum] = useState("");
    const [timer, setTimer] = useState(60);
    const [isStartCountDown, setCountDownStatus] = useState(false);

    // * 定时器
    let countDown: any;
    const countDownStart = (): void => {
        setTimer(timer - 1);
        setCountDownStatus(true);
    }

    // * useEffect 返回的函数表示组件销毁
    useEffect(() => {
        if (isStartCountDown) {
            countDown = setTimeout(() => {
                if (timer - 1 >= 0) {
                    setTimer(timer - 1);
                    countDown = null;
                } else {
                    setCountDownStatus(false);
                    clearTimeout(countDown);
                }
            }, 1);
        }
    }, [timer, isStartCountDown]);

    // * 重新获取验证码
    const handleReGetValCode = ():void => {
        postAction(url.getValidCode, { phone: phoneNum }).then((res: any) => {
            if (parseInt(res.code) === 10000) {
                // * 在axios中统一提示错误和正确的信息
                // setShowLogin(true)
                setTimer(5);
                setCountDownStatus(true);
                // Toast.success(res.msg);
            } else {
                // Toast.fail(res.msg);
            }
        })
    }

    const ShowGetPhoneNumber = (props?: any): JSX.Element => {
        const [phoneNum, setPhoneNum] = useState("")
        const [phoneErrMsg, setPhoneErrMsg] = useState("")
        const handlePhoneNumChange = (e: any) => {
            e = e.replace(/[^\d]/g, '')
            e.length < 12 ? setPhoneNum(e) : ""
        }
        // * 手机号码点击完成的时候触发
        const handleSubmitEdit = async ({ nativeEvent: { text } }): Promise<void> => {
            if (new RegExp(/^1[3|4|5|6|7|8|9][0-9]\d{8}$/).test(text)) {
                setPhoneErrMsg("")
            } else {
                setPhoneErrMsg('请输入正确的手机号码!')
            }
        }
        // * 获取验证码
        const handleGetValidateCode = (): void => {
            if (new RegExp(/^1[3|4|5|6|7|8|9][0-9]\d{8}$/).test(phoneNum)) {
                setPhoneErrMsg("")
                postAction(url.getValidCode, { phone: phoneNum }).then((res: any) => {
                    // console.info(res)
                    if (parseInt(res.code) === 10000) {
                        setShowLogin(true)
                        props.setFatherPhoneNum(phoneNum)
                        countDownStart();
                        // Toast.success(res.msg);
                    } else {
                        setShowLogin(false);
                        // Toast.fail(res.msg);
                    }
                })
            } else {
                setPhoneErrMsg('请输入正确的手机号码!')
            }
        }

        useEffect(() => {
            // Toast.message('卧槽', 100)
        }, [phoneNum])

        return (
            <>
                <View style={{ marginBottom: pxToDp(30) }}><Text style={{ fontSize: pxToDp(25), color: '#888', fontWeight: '600' }}>手机号登录注册</Text></View>
                <Input
                    placeholder='请输入手机号码'
                    keyboardType='phone-pad'
                    value={phoneNum}
                    inputStyle={{ color: "#333" }}
                    onChangeText={handlePhoneNumChange}
                    maxLength={11}
                    errorMessage={phoneErrMsg}
                    onSubmitEditing={handleSubmitEdit}
                    leftIcon={{
                        name: 'phone', type: 'font-awesome', color: '#ccc', size: pxToDp(20)
                    }}
                />
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <THBtn
                        style={{ width: '85%', height: pxToDp(40), overflow: 'hidden', borderRadius: pxToDp(20) }}
                        onPress={handleGetValidateCode}
                    >点击获取验证码</THBtn>
                </View>
            </>
        )
    }


    return (
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={{ flex: 1 }} enabled={true}>
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
            <View style={{ padding: pxToDp(20), ...styles.container }}>
                {
                    showLogin ? <Login phoneNum={phoneNum} timer={timer} handleReGetValCode={handleReGetValCode} navigation={props.navigation}/> : <ShowGetPhoneNumber setFatherPhoneNum={setPhoneNum}/>
                    // showLogin ? <Login phoneNum={phoneNum} /> : <TestInput />
                }
            </View>
        </KeyboardAvoidingView>
    )
}
