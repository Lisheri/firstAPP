# 报错
## ios项目启动, 报错 Cant build react native from box in XCode: 'event2/event-config.h' file not found #30836

需注释Podfile下面的

use_flipper!
post_install do |installer|
flipper_post_install(installer)
end

然后删除pods并重新安装

## android报错和java相关直接用android studio打包一次文件

# Mobx 6.x版本变动

6.x的mobx使用方式发生变化, 不能使用@observable, @observalble, 使用以往的模式将不再响应。需要使用函数`makeAutoObservable`

# 生命周期

+ componentWillMount 组件将要挂载
    - 可以进行api调用，可以获取数据，但是dom没有挂载，获取不到dom
+ componentDidMount 组件已经挂载
    - 组件已经挂载，可以对状态更新操作，可以操作dom
+ componentWillReceiveProps 父组件传递的属性有变化，做相应响应
    - 父组件传递的props发生变化时调用
+ shouldComponentUpdate 组件是否需要更新, 传递boolean值, 优化点
    - 组件是否需要更新，需要返回一个boolean，返回false则不更新
+ componentWillUpdate 组件将要更新
+ componentDidUpdate 组件已经更新
+ componentWillUnmount 组件已经销毁

# 使用 React Nativgation

## 安装

1. 安装 react-nativgation/native `yarn add @react-navigation/native`
2. 安装 依赖库 `yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view`
3. 安装 stack navigator library `yarn add @react-navigation/stack`


