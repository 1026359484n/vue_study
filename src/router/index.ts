import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "@/components/Home.vue";
import About from "@/components/About.vue";
import AntDesignTest from "@/components/AntDesignTest.vue";
import HelloWorld from "@/components/HelloWorld.vue";
import Layout from "@/views/Layout.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Layout",
    component: Layout,
    children: [
      {
        path: "",
        name: "HomePage",
        component: Home
      }
    ]
  },
  {
    path: "/device",
    name: "Device",
    component: Layout,
    children: [
      {
        path: "",
        name: "DeviceList",
        component: About
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
        name: "AntDesignTest",
        component: AntDesignTest
      }
    ]
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
