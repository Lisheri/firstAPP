import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinerGradient from 'react-native-linear-gradient';

const style = StyleSheet.create({
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        // margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
})

export default function index(props: any) {
    return (
        <TouchableOpacity style={props.style} onPress={props.onPress}>
            <LinerGradient
                // * 渐变颜色
                colors={['#9b63cd', '#e0708c']}
                style={style.linearGradient}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
            >
                <Text style={Object.assign(style.buttonText, props.textStyle)}>
                    {props.children}
                </Text>
            </LinerGradient>
        </TouchableOpacity>
    )
}
