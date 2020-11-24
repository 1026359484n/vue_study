import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import echarts from "echarts"
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";



const app = createApp(App);
//app.config.productionTip = false
app.config.globalProperties.echarts = echarts
app.use(store)
  .use(router)
  .use(ElementPlus)
  .use(Antd)
  .mount("#app");
