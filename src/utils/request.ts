import axios from "axios";
import {store} from '../store/index';
import { stringify } from 'qs';
import ToastOwn from './Toast';
import {Toast} from 'teaset';

export interface responseInterface{
    code: number | string;
    data: any;
    msg: string
}

const instance = axios.create({
    baseURL: 'http://localhost:9089',
    timeout: 180000 // 请求超时时间,
})

// * 请求拦截器
instance.interceptors.request.use(
    function (config) {
        // * 添加响应头等设置
        if (config.method === 'post') {

        }
        if (store.getState().token) {
            config.headers['X-Access-Token'] = store.getState().token
        }
        // * 拦截loading
        ToastOwn.showLoading('请求中')
        return config;
    },
    function (err) {
        // * 请求出错
        return Promise.reject(err)
    }
)

// * 响应拦截器
instance.interceptors.response.use(
    (res: any): any => {
        // console.info(config.data)
        if (parseInt(res.data.code) === 10001) {
            // * 对状态10001拦截处理, 业务异常s
            Toast.fail(res.data.msg);
        } else if (parseInt(res.data.code) === 10002) {
            // * 对状态10002拦截处理,服务器错误
            Toast.fail(res.data.msg);
        } else {
            Toast.success(res.data.msg);
        }
        // * 返回data的数据
        ToastOwn.hideLoading();
        return res.data;
    },
    err => {
        ToastOwn.hideLoading();
        return Promise.reject(err)
    }
)

const defaultUrl = '';
const defaultParams = '';

export function getAction(url: string = defaultUrl, params: any = defaultParams, options?: any) {
    return instance({
        method: 'GET',
        url,
        params,
        ...options
    })
}

export function postAction(url: string = defaultUrl, params: any = defaultUrl, options?: any) {
    return instance({
        method: 'POST',
        url,
        data: params,
        ...options
    })
}

// * 发起x-www格式请求需要手动指定请求headers中的 Content-type
export function postAction2(url: string, parameter: any, headers = {}, options?: any) {
    return axios({
        url: url,
        method: 'post',
        data: stringify(parameter),
        headers: headers,
        ...options
    })
}

export function httpAction(url: string, parameter: any, method: any) {
    return axios({
        url: url,
        method: method,
        data: parameter
    })
}

//put
export function putAction(url: string, parameter: any) {
    return axios({
        url: url,
        method: 'put',
        data: parameter
    })
}

export function deleteAction(url: string, parameter: any) {
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
export function downFilePost(url: string, parameter: any) {
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