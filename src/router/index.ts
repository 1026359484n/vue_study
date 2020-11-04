import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import LoginNew from "@/views/LoginNew.vue";
import Layout from "@/layout/index.vue";
import About from "@/views/About.vue";

export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    meta: {
      title: '首页',
      icon: 'home-4-line',
      affix: true,
    },
    children: [
      {
        path: '/index',
        name: 'Index',
        component: Home,
        meta: {
          title: '首页',
          icon: 'home-4-line',
          affix: true,
        },
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/loginNew",
    name: "LoginNew",
    component: LoginNew
  },
  {
    path: "/about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Layout,
    redirect: '/about/index',
    children: [
      {
        path: 'index',
        component: About,
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
    component: Layout,
    redirect: '/ant/index',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    children: [
      {
        path: 'index',
        component: () =>
            import(/* webpackChunkName: "about" */ "@/views/AntDesignTest.vue"),
        meta: {
          title: '首页',
          icon: 'home-4-line',
          affix: true,
        },
      }
    ],
  }
];
export const constantRoutes = []

const router = createRouter({
  history: createWebHashHistory(),
  routes: asyncRoutes
});
router.beforeEach((to, from, next) => {
  //此处获取登陆的用户信息，可以按照自己的方法获取，此处暂时用localStorage里面获取
  const token = localStorage.token;
  //判断是否存在用户信息、或者该页面是否需要登陆
  if (token || !to.meta.login) {
    //如果能获取到用户信息，说明用户已经登陆了，或者该页面不需要登陆也能进入就直接放行进入该页面
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
