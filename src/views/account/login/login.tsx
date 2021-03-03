import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, StyleSheet, Alert } from 'react-native';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import THBtn from '@/components/THButton';
import { pxToDp } from '@/utils/stylesKits';
import {loginVerification} from '@/utils/api';
import {responseInterface} from '@/utils/request';
import {Toast} from 'teaset';
import {connect} from 'react-redux';
import {store} from '@/store/index';

const styles = StyleSheet.create({
    root: { flex: 1, padding: 20, paddingTop: 50 },
    title: { textAlign: 'center', fontSize: 30 },
    codeFieldRoot: { marginTop: 20 },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        // borderWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#00000030',
        textAlign: 'center',
        color: '#7d53ea'
    },
    focusCell: {
        borderColor: '#7d53ea',
    },
});
const CELL_COUNT = 6; // * 单元格个数

interface ValidateCodeInterface {
    handleBlur(value: string):void;
}

interface tokenInterface {
    type: string;
    value: string;
}
interface dispatchInterface {
    sendActionToChangeToken(action: tokenInterface): void;
}



// interface dispatchInterface {
//     dispatchInterfaceIn: dispatchInterfaceIn
// }

const ValidateCode = (context: ValidateCodeInterface) => {
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    return (
        <SafeAreaView style={styles.root}>
            <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                onSubmitEditing={context.handleBlur.bind(this, value)}
                onBlur={context.handleBlur.bind(this, value)}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                    <Text
                        key={index}
                        style={[styles.cell, isFocused && styles.focusCell]}
                        onLayout={getCellOnLayoutHandler(index)}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                )}
            />
        </SafeAreaView>
    );
}

const mapDispatchToProps = (dispatch: any): dispatchInterface => {
    return {
        sendActionToChangeToken: (token: tokenInterface) => {
            dispatch({
                type: 'changeToken',
                value: token
            })
        }
    }
}

function login(props: any) {
    // const [timeer, setTimer] = useState(60)
    useEffect(() => {
        // * 第二个参数是空数组可以模拟componentDidMount
    }, []);

    // * 用于监听store
    // store.subscribe(() => {
    //     console.info(store.getState())
    // })

    const handleBlur = (value: string): void => {
        if (value.length < 6) {
            Toast.fail('验证码错误')
            return
        }
        loginVerification({phone: props.phoneNum, vcode: value}).then((res: responseInterface): void => {
            if (parseInt(res.code) === 10000) {
                if (res.data.token) {
                    // * 登陆成功后更新用户token
                    props.sendActionToChangeToken(res.data.token)
                }
                if (res.data.isNew) {
                    props.navigation.navigate('UserInfo')
                } else {
                    Toast.message('欢迎回来，即将跳转到交友页面')
                }
            }
        })
    }

    return (
        <>
            <View><Text style={{ fontSize: pxToDp(25), color: '#888', fontWeight: 'bold' }}>输入六位验证码</Text></View>
            <View style={{ marginTop: pxToDp(15) }}><Text style={{ color: '#888' }}>已发到: +86 {`${props.phoneNum}`}</Text></View>
            <ValidateCode handleBlur={handleBlur}/>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <THBtn 
                    style={{ width: '85%', height: pxToDp(40), overflow: 'hidden', borderRadius: pxToDp(20) }} 
                    disabled={props.timer > 0}
                    onPress={props.handleReGetValCode}
                >
                        重新获取{props.timer <= 0 ? '' : `(${props.timer}s)`}
                </THBtn>
            </View>
        </>
    )
}

// * 高阶函数 connect, 接收两个参数, 第一个表示要添加的属性, 第二个表示要添加的方法 (都是store中的), 返回一个HOC 再接收原组件并将上述属性和方法添加到原组件上
export default connect(null, mapDispatchToProps)(login)
