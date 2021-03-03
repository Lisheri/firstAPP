import { store } from "../store"


// * 学习使用react-redux
// * reducer 需要对逻辑进行处理
// * dispatch 分发的哪一个action, 这边接收的就是什么样的action
const initState = {
    token: ''
}
export const rootReducer = (state = initState, action: any) => {
    // return state
    if (action.type === 'changeToken') {
        return Object.assign(state, {token: action.value})
    } else {
        return state
    }
}