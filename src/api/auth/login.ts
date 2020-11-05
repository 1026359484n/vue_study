import request from '@/utils/request'
export async function login(data :Record<string, any>) {
    return request({
        url: '/auth/oauth/token',
        method: 'post',
        data,
    })
}


