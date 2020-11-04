import { createStore } from "vuex";

/*export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {}
});*/
/**
 * @author chuzhixin 1204505056@qq.com
 * @description 导入所有 vuex 模块，自动加入namespaced:true，用于解决vuex命名冲突，请勿修改。
 */
//import { createStore } from 'vuex'

const files = require.context('./modules', false, /\.ts$/)
const modules :any = {}
files.keys().forEach((key: string) => {
  modules[key.replace(/(\.\/|\.ts)/g, '')] = files(key).default
})
Object.keys(modules).forEach((key) => {
  modules[key]['namespaced'] = true
})
export default createStore({
  modules,
})
