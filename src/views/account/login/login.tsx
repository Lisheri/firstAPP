import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import THBtn from '@/components/THButton';
import { pxToDp } from '@/utils/stylesKits'

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

const ValidateCode = () => {
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

export default function login(props: any) {
    // const [timeer, setTimer] = useState(60)
    useEffect(() => {
        // * 第二个参数是空数组可以模拟componentDidMount
    }, [])
    return (
        <>
            <View><Text style={{ fontSize: pxToDp(25), color: '#888', fontWeight: 'bold' }}>输入六位验证码</Text></View>
            <View style={{ marginTop: pxToDp(15) }}><Text style={{ color: '#888' }}>已发到: +86 {`${props.phoneNum}`}</Text></View>
            <ValidateCode />
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
