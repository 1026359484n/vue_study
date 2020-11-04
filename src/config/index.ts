/**
 * @description 3个子配置，通用配置|主题配置|网络配置，建议在当前目录下修改config.js修改配置，会覆盖默认配置，也可以直接修改默认配置
 */

import setting from './default/setting.config'
import theme from './default/theme.config'
import network from './default/net.config'
import config from "./config";
//默认配置
//自定义配置

//导出配置（以自定义配置为主）
export default  Object.assign({}, setting, theme, network, config)
