import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import AntDesignTest from "@/views/AntDesignTest.vue";
import Layout from "@/layout/layout.vue";
import Login from '@/views/Login.vue'
import store from '@/store'

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    meta: {
      title: '面板',
      icon: 'home-4-line',
      affix: true,
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Home,
        meta: {
          title: '首页',
          icon: 'home-4-line',
          affix: true,
        },
      },
    ]
  },
  {
    path: "/device",
    name: "Device",
    component: Layout,
    meta: {
      title: '设备',
      icon: 'home-4-line',
      affix: true,
    },
    children: [
      {
        path: 'about',
        name: 'About',
        component: About,
        meta: {
          title: '子设备页',
          icon: 'home-4-line',
          affix: true,
        },
      },
    ],
  },
  {
    path: "/user",
    name: "User",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Layout,
    meta: {
      title: '首页',
      icon: 'home-4-line',
      affix: true,
    },
    children: [
      {
        path: 'default',
        name: 'Default',
        component: AntDesignTest,
        meta: {
          title: '首页',
          icon: 'home-4-line',
          affix: true,
        },
      },
    ],
  },
  {
    path: "/ant",
    name: "Websocket",
    component: Layout,
    meta: {
      title: '首页',
      icon: 'home-4-line',
      affix: true,
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: AntDesignTest,
        meta: {
          title: '首页',
          icon: 'home-4-line',
          affix: true,
        },
      },
    ],
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  //此处获取登陆的用户信息，可以按照自己的方法获取，此处暂时用localStorage里面获取
  const token = localStorage.token;
  //判断是否存在用户信息、或者该页面是否需要登陆
  //debugger
  if (token) {
    //如果能获取到用户信息，说明用户已经登陆了，或者该页面不需要登陆也能进入就直接放行进入该页面
    if (to.path==='/login') {
      next();
    }else {
      const role = store.getters['role']
      if (role){
        next()
      }else {
        await store.dispatch('getUserInfo')
        const accessRoutes = await store.dispatch('setRoutes')
        accessRoutes.forEach((item :RouteRecordRaw) => {
          router.addRoute(item)
        })
        next({ ...to, replace: true })
      }
    }
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
