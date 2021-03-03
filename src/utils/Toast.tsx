import { Toast, Theme } from 'teaset';
import React from 'react';
import {ActivityIndicator} from 'react-native';

let customKey: any = null;

const Icon = () => {
    // * 使用标签必须把文件名改成tsx
    return <ActivityIndicator size="large" color={Theme.toastIconTintColor} />;
}

Toast.showLoading = (text: string): void => {
    if (customKey) return;
    customKey = Toast.show({
        text,
        icon: <ActivityIndicator size="large" color={Theme.toastIconTintColor} />,
        position: 'center',
        duration: 1000000,
    });
}

Toast.hideLoading = (): void => {
    if (!customKey) return;
    Toast.hide(customKey);
    customKey = null;
}

// Toast.success = (text: string): void => {
//     Toast.success(text)
// }

// Toast.error = (text: string): void => {
//     Toast.fail(text)
// }

export default Toast;