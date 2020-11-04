/**
 * @author chuzhixin 1204505056@qq.com
 * @description 路由拦截状态管理，目前两种模式：all模式与intelligence模式，其中partialRoutes是菜单暂未使用
 */
import { asyncRoutes, constantRoutes } from '@/router'
import { getRouterList } from '@/api/router'
import { convertRouter, filterRoutes } from '@/utils/routes'

const state = { routes: [], partialRoutes: [] }
const getters = {
  routes: (state:any) => state.routes,
  partialRoutes: (state:any) => state.partialRoutes,
}
const mutations = {
  setRoutes(state:any, routes:any) {
    state.routes = routes
  },
  setPartialRoutes(state:any, routes:any) {
    state.partialRoutes = routes
  },
}
const actions = {
  /**
   * @author chuzhixin 1204505056@qq.com
   * @description intelligence模式设置路由
   * @param {*} { commit }
   * @returns
   */
  async setRoutes({ commit }:{ commit:any }) {
    const finallyRoutes = filterRoutes([...constantRoutes, ...asyncRoutes])
    commit('setRoutes', finallyRoutes)
    return [...asyncRoutes]
  },
  /**
   * @author chuzhixin 1204505056@qq.com
   * @description all模式设置路由
   * @param {*} { commit }
   * @returns
   */
  async setAllRoutes({ commit }:{ commit:any }) {
    const { data } = await getRouterList({})
    if (data[data.length - 1].path !== '*')
      data.push({ path: '*', redirect: '/404', hidden: true })
    const asyncRoutes = convertRouter(data)
    const finallyRoutes = filterRoutes([...constantRoutes, ...asyncRoutes])
    commit('setRoutes', finallyRoutes)
    return [...asyncRoutes]
  },
  /**
   * @author chuzhixin 1204505056@qq.com
   * @description 画廊布局、综合布局设置路由
   * @param {*} { commit }
   * @param accessedRoutes 画廊布局、综合布局设置路由
   */
  setPartialRoutes({ commit }:{ commit :any }, accessedRoutes :any) {
    commit('setPartialRoutes', accessedRoutes)
  },
}
export default { state, getters, mutations, actions }
