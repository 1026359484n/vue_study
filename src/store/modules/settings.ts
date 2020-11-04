/**
 * @author chuzhixin 1204505056@qq.com
 * @description 所有全局配置的状态管理，如无必要请勿修改
 */
import defaultSettings from '@/config/index'
import { isJson } from '@/utils/validate'
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

const getLocalStorage = (key :any) => {
  const value = localStorage.getItem(key)
  if (isJson(value)) {
    return JSON.parse(value as string)
  } else {
    return false
  }
}

const theme = getLocalStorage('vue-admin-beautiful-pro-theme')
const { collapse } = getLocalStorage('vue-admin-beautiful-pro-collapse')
const { language } = getLocalStorage('vue-admin-beautiful-pro-language')
const toggleBoolean = (key :string) => {
  return typeof theme[key] !== 'undefined' ? theme[key] : key
}

const state = {
  logo,
  title,
  collapse,
  themeName: theme.themeName || themeName,
  layout: theme.layout || layout,
  header: theme.header || header,
  device: 'desktop',
  language: language || i18n,
  showLanguage: toggleBoolean(showLanguage),
  showProgressBar: toggleBoolean(showProgressBar),
  showRefresh: toggleBoolean(showRefresh),
  showSearch: toggleBoolean(showSearch),
  showTheme: toggleBoolean(showTheme),
  showTagsBar: toggleBoolean(showTagsBar),
  showNotice: toggleBoolean(showNotice),
  showFullScreen: toggleBoolean(showFullScreen),
}
const getters = {
  collapse: (state:any) => state.collapse,
  device: (state:any) => state.device,
  header: (state:any) => state.header,
  language: (state:any) => state.language,
  layout: (state:any) => state.layout,
  logo: (state:any) => state.logo,
  title: (state:any) => state.title,
  showLanguage: (state:any) => state.showLanguage,
  showProgressBar: (state:any) => state.showProgressBar,
  showRefresh: (state:any) => state.showRefresh,
  showSearch: (state:any) => state.showSearch,
  showTheme: (state:any) => state.showTheme,
  showTagsBar: (state:any) => state.showTagsBar,
  showNotice: (state:any) => state.showNotice,
  showFullScreen: (state:any) => state.showFullScreen,
  themeName: (state:any) => state.themeName,
}
const mutations = {
  toggleCollapse(state:any) {
    state.collapse = !state.collapse
    localStorage.setItem(
      'vue-admin-beautiful-pro-collapse',
      `{"collapse":${state.collapse}}`
    )
  },
  toggleDevice(state:any, device:any) {
    state.device = device
  },
  changeHeader(state:any, header:any) {
    state.header = header
  },
  changeLayout(state:any, layout:any) {
    state.layout = layout
  },
  handleShowLanguage(state:any, showLanguage:any) {
    state.showLanguage = showLanguage
  },
  handleShowProgressBar(state:any, showProgressBar:any) {
    state.showProgressBar = showProgressBar
  },
  handleShowRefresh(state:any, showRefresh:any) {
    state.showRefresh = showRefresh
  },
  handleShowSearch(state:any, showSearch:any) {
    state.showSearch = showSearch
  },
  handleShowTheme(state:any, showTheme:any) {
    state.showTheme = showTheme
  },
  handleShowTagsBar(state:any, showTagsBar:any) {
    state.showTagsBar = showTagsBar
  },
  handleShowNotice(state:any, showNotice:any) {
    state.showNotice = showNotice
  },
  handleShowFullScreen(state:any, showFullScreen:any) {
    state.showFullScreen = showFullScreen
  },
  openSideBar(state:any) {
    state.collapse = false
  },
  foldSideBar(state:any) {
    state.collapse = true
  },
  changeLanguage(state:any, language:any) {
    localStorage.setItem(
      'vue-admin-beautiful-pro-language',
      `{"language":"${language}"}`
    )
    state.language = language
  },
}
const actions = {
  toggleCollapse({ commit }:{ commit:any }) {
    commit('toggleCollapse')
  },
  toggleDevice({ commit }:{ commit:any }, device :any) {
    commit('toggleDevice', device)
  },
  changeHeader({ commit }:{ commit:any }, header :any) {
    commit('changeHeader', header)
  },
  changeLayout({ commit }:{ commit:any }, layout :any) {
    commit('changeLayout', layout)
  },
  handleShowLanguage: ({ commit }:{ commit:any }, showLanguage :any) => {
    commit('handleShowLanguage', showLanguage)
  },
  handleShowProgressBar: ({ commit }:{ commit:any }, showProgressBar :any) => {
    commit('handleShowProgressBar', showProgressBar)
  },
  handleShowRefresh: ({ commit }:{ commit:any }, showRefresh :any) => {
    commit('handleShowRefresh', showRefresh)
  },
  handleShowSearch: ({ commit }:{ commit:any }, showSearch :any) => {
    commit('handleShowSearch', showSearch)
  },
  handleShowTheme: ({ commit }:{ commit:any }, showTheme :any) => {
    commit('handleShowTheme', showTheme)
  },
  handleShowTagsBar({ commit }:{ commit:any }, showTagsBar :any) {
    commit('handleShowTagsBar', showTagsBar)
  },
  handleShowNotice: ({ commit }:{ commit:any }, showNotice :any) => {
    commit('handleShowNotice', showNotice)
  },
  handleShowFullScreen: ({ commit }:{ commit:any }, showFullScreen :any) => {
    commit('handleShowFullScreen', showFullScreen)
  },
  openSideBar({ commit }:{ commit:any }) {
    commit('openSideBar')
  },
  foldSideBar({ commit }:{ commit:any }) {
    commit('foldSideBar')
  },
  changeLanguage: ({ commit }:{ commit:any }, language :any) => {
    commit('changeLanguage', language)
  },
}
export default { state, getters, mutations, actions }
