import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import axios from "axios";
import VueAxios from "vue-axios";

axios.defaults.withCredentials = false;

const app = createApp(App);
//app.config.productionTip = false
app
  .use(store)
  .use(router)
  .use(Antd)
  //.use(VueAxios, axios)
  .mount("#app");
