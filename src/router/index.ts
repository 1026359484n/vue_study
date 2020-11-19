import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import Home from "@/components/Home.vue";
import DeviceTable from "@/views/DeviceTable.vue";
import ChartPage from "@/views/ChartPage.vue";
import WebsocketTest from "@/views/WebsocketTest.vue";
import HelloWorld from "@/components/HelloWorld.vue";
import Layout from "@/layout/Layout.vue";
import Login from "@/views/Login.vue";
import DataTable from "@/views/DataTable.vue";
import store from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    name: "Layout",
    redirect: "/device"
  },
  {
    path: "/device",
    name: "Device",
    component: Layout,
    children: [
      {
        path: "",
        name: "DeviceList",
        component: DeviceTable
      }
    ]
  },
  {
    path: "/user",
    name: "User",
    component: Layout,
    children: [
      {
        path: "",
        name: "UserList",
        component: HelloWorld
      }
    ]
  },
  {
    path: "/websocket",
    name: "Websocket",
    component: Layout,
    children: [
      {
        path: "",
        name: "WebsocketTest",
        component: WebsocketTest
      }
    ]
  },
  {
    path: "/charts",
    name: "Charts",
    component: Layout,
    children: [
      {
        path: "",
        name: "Charts",
        component: ChartPage
      }
    ]
  },
  {
    path: "/data",
    name: "Data",
    component: Layout,
    children: [
      {
        path: "",
        name: "DataTable",
        component: DataTable
      }
    ]
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  //此处获取登陆的用户信息，可以按照自己的方法获取，此处暂时用localStorage里面获取
  const token = localStorage.token;
  //判断是否存在用户信息、或者该页面是否需要登陆
  if (token||to.path === '/login') {
    //如果能获取到用户信息，说明用户已经登陆了，或者该页面不需要登陆也能进入就直接放行进入该页面
    if (to.path === '/login') {
      next();
    } else {
      const role = store.getters['role']
      /*if (role) {
        next()
      } else {
        await store.dispatch('getUserInfo')
        const accessRoutes = await store.dispatch('setRoutes')
        accessRoutes.forEach((item: RouteRecordRaw) => {
          router.addRoute(item)
        })
        next({...to, replace: true})
      }*/

    }
    next();
  } else {
    //否则的跳转到登陆页面，并且带上当前页面的地址，用于登陆后重新跳回来
    next({
      name: "Login",
      query: {
        redirect: to.fullPath //当前页面的地址
      }
    });
  }
});


export default router;
