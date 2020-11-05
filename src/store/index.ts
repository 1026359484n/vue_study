import { createStore } from "vuex";
import {routes} from '@/router'
import { isJson } from '@/utils/validate'
import defaultSettings from '@/config/config'
import {login} from '@/api/auth/login'
import {getUserInfo} from '@/api/auth/user'
import { message, notification } from 'ant-design-vue'
import {getAccessToken,setAccessToken,removeAccessToken} from "@/utils/token";
const {
  logo,
  title,
  layout,
  header,
  themeName,
  i18n,
  showLanguage,
  showProgressBar,
  showRefresh,
  showSearch,
  showTheme,
  showTagsBar,
  showNotice,
  showFullScreen,
} = defaultSettings

const getLocalStorage = (key :string) => {
  const value = localStorage.getItem(key)
  if (isJson(value)) {
    return JSON.parse(value as string)
  } else {
    return false
  }
}
const { collapse } = getLocalStorage('collapse')
const { role } = getLocalStorage('collapse')

export default createStore({
  state: {
    accessToken: getAccessToken(),
    collapse,
    role,
    routes: [],
  },
  getters: {
    collapse: (state) => state.collapse,
    accessToken: (state) => state.accessToken,
    role: (state) => state.role,
    routes: (state) => state.routes,
  },
  mutations: {
    toggleCollapse(state) {
      state.collapse = !state.collapse
      localStorage.setItem(
          'vue-admin-beautiful-pro-collapse',
          `{"collapse":${state.collapse}}`
      )
    },
    setAccessToken(state, accessToken) {
      state.accessToken = accessToken
      setAccessToken(accessToken)
    },
    setRole(state, role) {
      state.role = role
    },
    setRoutes(state, routes) {
      state.routes = routes
    },
  },
  actions: {
    toggleCollapse({ commit }) {
      commit('toggleCollapse')
    },
    async logout({ dispatch }) {
      removeAccessToken()
      await dispatch('resetAll')
    },
    async login({ commit }, userInfo) {
      const { data } = await login(userInfo)
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
          message: `欢迎登录${title}`,
          description: `${thisTime}！`,
        })
      } else {
        message.error(`登录接口异常，未正确返回access_token...`)
      }
    },
    async getUserInfo({ commit, dispatch, state }) {
      const { data } = await getUserInfo()
      if (!data) {
        message.error(`验证失败，请重新登录...`)
        return false
      }
      const roles = data.body.user.roles
      if (roles) {
        let role = "user"
        const rolesArray = roles.split(",")
        if (rolesArray.indexOf("admin")!=-1){
          role = "admin"
        }else if (rolesArray.indexOf("agent")!=-1){
          role = "agent"
        }
        dispatch('setRole', roles, { root: true })
        /*if (ability && ability.length > 0)
          dispatch('acl/setAbility', ability, { root: true })*/
        //commit('setUsername', username)
        //commit('setAvatar', avatar)
      } else {
        message.error('用户信息接口异常')
      }
    },
    setRole({ commit }, role) {
      commit('setRole', role)
    },
    async setRoutes({ commit }) {
      //const finallyRoutes = filterRoutes([...constantRoutes, ...asyncRoutes])
      commit('setRoutes', routes)
      return [...routes]
    },
  },
  modules: {}
});
