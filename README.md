# ios项目启动, 报错 Cant build react native from box in XCode: 'event2/event-config.h' file not found #30836

需注释Podfile下面的

use_flipper!
post_install do |installer|
flipper_post_install(installer)
end

然后删除pods并重新安装


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
