import {createStore} from 'redux';

import {rootReducer} from '../reducer/index'

// * 使用 store.subscribe 来监听reducer执行完毕, 接收一个回调函数
// * 构建 store
export const store = createStore(rootReducer)