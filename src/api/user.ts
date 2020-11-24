import request from "@/utils/request";

export function getUserInfo() {
  //此处为了兼容mock.js使用data传递accessToken，如果使用mock可以走headers
  return request({
    url: "/auth/user/info",
    method: "get"
  });
}
