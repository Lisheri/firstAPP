// 设计稿的宽度 / 元素宽度 = 手机屏幕 / 手机中元素的宽度
import { Dimensions } from 'react-native';

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;
// * 375 代表设计稿宽度
export const pxToDp = (px) => screenWidth * px / 375;