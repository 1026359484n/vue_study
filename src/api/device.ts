import request from "@/utils/request";

export interface DeviceQo {
    paged: boolean,
    doseMsgNeeded: boolean,
    queryAll: boolean,
    orderCol: string,
    pageSize: number,
    pageNum: number,
    direction: string,
    deviceName: string|null
    type: Array<string>
}

export function deviceList(data:any) {
    //此处为了兼容mock.js使用data传递accessToken，如果使用mock可以走headers
    return request({
        url: '/device/list',
        method: 'post',
        data
    })
}
