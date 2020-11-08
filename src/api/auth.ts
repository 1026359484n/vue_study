import request from '@/utils/request'
export async function login(data :any) {
    return request({
        url: '/auth/oauth/token',
        method: 'post',
        data,
    })
}
