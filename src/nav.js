import React, { useState, useEffect } from 'react';

import { Button, View, Text, StyleSheet } from 'react-native';

import { NavigationContainer, StackActions } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';

import Login from './views/account/login/index';

const DetailsScreen = (props) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>详情页</Text>
        </View>
    )
}

const Stack = createStackNavigator();

export default function nav() {
    return (
        <NavigationContainer>
            {/* 
      // * headerMode="none"隐藏标题 
      */}
            <Stack.Navigator headerMode="none" initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Details" component={DetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
