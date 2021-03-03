"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_linear_gradient_1 = require("react-native-linear-gradient");
var stylesKits_1 = require("@/utils/stylesKits");
var style = react_native_1.StyleSheet.create({
    linearGradient: {
        flex: 1,
        paddingLeft: stylesKits_1.pxToDp(15),
        paddingRight: stylesKits_1.pxToDp(15),
        borderRadius: stylesKits_1.pxToDp(5),
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: stylesKits_1.pxToDp(18),
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        // margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent'
    }
});
function index(props) {
    return (react_1["default"].createElement(react_native_1.TouchableOpacity, { style: props.style, onPress: props.onPress, disabled: props.disabled },
        react_1["default"].createElement(react_native_linear_gradient_1["default"]
        // * 渐变颜色
        , { 
            // * 渐变颜色
            colors: props.disabled ? ['#888', '#888'] : ['#9b63cd', '#e0708c'], style: style.linearGradient, start: { x: 0, y: 0 }, end: { x: 1, y: 0 } },
            react_1["default"].createElement(react_native_1.Text, { style: Object.assign(style.buttonText, props.textStyle) }, props.children))));
}
exports["default"] = index;
