import axios from 'axios'
//import { MessageBox, Message } from 'element-ui'
import store from '@/store'

/* 防止重复提交，利用axios的cancelToken */
let pending: any[] = []; // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
const CancelToken: any = axios.CancelToken;

//localStorage.baseUrl = window.location.host;
const baseUrl = "https://nswx.yoo.la"
// create an axios instance
const service = axios.create({
    baseURL: /*localStorage.baseUrl?localStorage.baseUrl:*/baseUrl, // url = base url + request url
    //withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    (config: any)=> {

        // do something before request is sent
        if (localStorage.token&&!config.url.endsWith("/oauth/token")) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            config.headers['Authorization'] = `Bearer ${localStorage.token}`
        }

        /*if (localStorage.baseUrl) {
            config.baseURL = localStorage.baseUrl
        }*/
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
        if (res.code !== 0&&!res.access_token) {
            //请求失败
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
        return Promise.reject(error)
    }
)

export default service
