import axios from "axios";
import store from '../../mobx/index';
import { stringify } from 'qs';

const instance = axios.create({
    baseURL: 'http://localhost:9089',
    timeout: 180000 // 请求超时时间,
})

// * 请求拦截器
instance.interceptors.request.use(
    function (config) {
        // * 添加响应头等设置
        if (config.method === 'post') {
            // * 此处对x-www类型的post请求做序列化, 比如使用qs.stringify()
            // config.data = stringify(config.data);
        }
        if (store.getToken()) {
            config.headers['X-Access-Token'] = store.getToken()
        }
        return config;
    },
    function (err) {
        // * 请求出错
        return Promise.reject(err)
    }
)

// * 响应拦截器
instance.interceptors.response.use(
    res => {
        // console.info(config.data)
        if (res.data.code === 10001) {
            // * 对状态10001拦截处理, 业务异常
        } else if (res.data.code === 10002) {
            // * 对状态10002拦截处理,服务器错误
        }
        // * 返回data的数据
        return res.data;
    },
    err => {
        return Promise.reject(err)
    }
)

const defaultUrl = '';
const defaultParams = '';

export function getAction(url = defaultUrl, params = defaultParams, options) {
    return instance({
        method: 'GET',
        url,
        params,
        ...options
    })
}

export function postAction(url = defaultUrl, params = defaultUrl, options) {
    return instance({
        method: 'POST',
        url,
        data: params,
        ...options
    })
}

// * 发起x-www格式请求需要手动指定请求headers中的 Content-type
export function postAction2(url, parameter, headers = {}, options) {
    return axios({
        url: url,
        method: 'post',
        data: stringify(parameter),
        headers: headers,
        ...options
    })
}

export function httpAction(url, parameter, method) {
    return axios({
        url: url,
        method: method,
        data: parameter
    })
}

//put
export function putAction(url, parameter) {
    return axios({
        url: url,
        method: 'put',
        data: parameter
    })
}

export function deleteAction(url, parameter) {
    return axios({
        url: url,
        method: 'delete',
        params: parameter
    })
}

/**
* 下载文件 用于excel导出, post方式
* @param url
* @param parameter
* @returns {*}
*/
export function downFilePost(url, parameter) {
    return new Promise((resolve, reject) => {
        axios({
            url: url,
            data: parameter,
            method: 'post',
            responseType: 'blob'
        }).then(res => {
            // * 如果返回的是json，则为导出失败
            if (res && res.type === 'application/json') {
                try {
                    let fileReader = new FileReader();
                    fileReader.onload = function () {
                        const jsonData = JSON.parse(this.result);
                        message.error(jsonData.message)
                    }
                    fileReader.readAsText(res)
                    reject(res)
                } catch (error) {
                    reject(error)
                }
            } else {
                resolve(res)
            }
        }).catch(err => {
            reject(err)
        })
    })
}

// export default {
//     get: instance.get,
//     post: instance.post
// }