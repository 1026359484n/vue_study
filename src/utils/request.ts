import axios from 'axios'
//import { MessageBox, Message } from 'element-ui'
import store from '@/store'

/* 防止重复提交，利用axios的cancelToken */
let pending: any[] = []; // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
const CancelToken: any = axios.CancelToken;
const removePending: any = (config: any, f: any) => {
    // 获取请求的url
    const flagUrl = config.url;
    // 判断该请求是否在请求队列中
    if (pending.indexOf(flagUrl) !== -1) {
        // 如果在请求中，并存在f,f即axios提供的取消函数
        if (f) {
            f('取消重复请求'); // 执行取消操作
        } else {
            pending.splice(pending.indexOf(flagUrl), 1); // 把这条记录从数组中移除
        }
    } else {
        // 如果不存在在请求队列中，加入队列
        if (f) {
            pending.push(flagUrl);
        }
    }
};

localStorage.baseUrl = window.location.host;

// create an axios instance
const service = axios.create({
    baseURL: localStorage.baseUrl, // url = base url + request url
    //withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    (config: any)=> {
        // neverCancel 配置项，允许多个请求
        if (!config.neverCancel) {
            // 生成cancelToken
            config.cancelToken = new CancelToken((c: any) => {
                removePending(config, c);
            });
        }

        // do something before request is sent
        if (localStorage.token&&!config.url.endsWith("/oauth/token")) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            config.headers['Authorization'] = `Bearer ${localStorage.token}`
        }
        config.baseURL = localStorage.baseUrl
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    (response: any) => {
        const res = response.data

        // if the custom code is not 20000, it is judged as an error.
        if (res.code !== 200&&!res.access_token) {
            /*Message({
                message: res.message || 'Error',
                type: 'error',
                duration: 5 * 1000
            })*/

            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                // to re-login
                /*MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
                    confirmButtonText: 'Re-Login',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('user/resetToken').then(() => {
                        location.reload()
                    })
                })*/
            }
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return response
        }
    },
    (error: any) => {
        console.log('err' + error) // for debug
        pending = [];
        if (error.message === '取消重复请求') {
            return Promise.reject(error);
        }
        /*Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })*/
        return Promise.reject(error)
    }
)

export default service
