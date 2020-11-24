import request from "@/utils/request";

export function getData(type: string, deviceName: string) {
  //此处为了兼容mock.js使用data传递accessToken，如果使用mock可以走headers
  return request({
    url: "/influx/search/"
      .concat(type)
      .concat("/")
      .concat(deviceName),
    method: "get"
  });
}
