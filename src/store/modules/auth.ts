import { login } from '@/api/auth/login';
import { getAccessToken,setAccessToken } from '@/utils/auth';
import { message, notification } from 'ant-design-vue'

//let actions: { login({commit}: { commit: any }, userInfo: any): Promise<void> };
const actions = {
    async login({commit}: { commit: any }, userInfo: any) {
        const {data} = await login(userInfo)
        const accessToken = data['access_token']
        if (accessToken) {
            commit('setAccessToken', accessToken)
            const hour = new Date().getHours()
            const thisTime =
                hour < 8
                    ? '早上好'
                    : hour <= 11
                    ? '上午好'
                    : hour <= 13
                        ? '中午好'
                        : hour < 18
                            ? '下午好'
                            : '晚上好'
            notification.open({
                message: `欢迎登录 xxx 专属后台`,
                description: `${thisTime}！`,
            })
        } else {
            message.error(`登录接口异常，未正确返回${'access_token'}...`)
        }
    },
    async logout({dispatch}: { dispatch: any }) {
        localStorage.token = null
        //await dispatch('resetAll')
    }
};

export default {actions}
