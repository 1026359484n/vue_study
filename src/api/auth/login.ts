import request from '@/utils/request'

export function login(data: any) {
    return request({
        url: 'https://nswx.yoo.la/auth/oauth/token',
        method: 'post',
        data
    });
}
