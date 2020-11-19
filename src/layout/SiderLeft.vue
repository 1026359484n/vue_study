<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    theme="dark"
    :inline-collapsed="collapsed"
    style="height: 775px"
  >
    <a-menu-item key="1">
      <router-link to="/device">
        <PieChartOutlined />
        <span>设备管理</span>
      </router-link>
    </a-menu-item>

    <a-menu-item key="2">
      <router-link to="/user">
        <DesktopOutlined />
        <span>用户管理</span>
      </router-link>
    </a-menu-item>

    <a-menu-item key="3">
      <router-link to="/websocket">
        <InboxOutlined />
        <span>websocket测试</span>
      </router-link>
    </a-menu-item>

    <a-menu-item key="4">
      <router-link to="/data">
        <InboxOutlined />
        <span>数据管理</span>
      </router-link>
    </a-menu-item>

    <a-menu-item key="5">
      <router-link to="/charts">
        <BarChartOutlined />
        <span>图表</span>
      </router-link>
    </a-menu-item>

    <a-sub-menu key="sub1">
      <template v-slot:title>
        <span><MailOutlined /><span>Navigation One</span></span>
      </template>
      <a-menu-item key="6">Option 6</a-menu-item>
      <a-menu-item key="7">Option 7</a-menu-item>
      <a-menu-item key="8">Option 8</a-menu-item>
      <a-menu-item key="9">Option 9</a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="sub2">
      <template v-slot:title>
        <span><AppstoreOutlined /><span>Navigation Two</span></span>
      </template>
      <a-menu-item key="10">Option 10</a-menu-item>
      <a-menu-item key="11">Option 11</a-menu-item>
      <a-sub-menu key="sub3" title="Submenu">
        <a-menu-item key="12"> Option 12 </a-menu-item>
        <a-menu-item key="13"> Option 13 </a-menu-item>
      </a-sub-menu>
    </a-sub-menu>
  </a-menu>
</template>

<script lang="ts">
import {
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
  BarChartOutlined,
} from "@ant-design/icons-vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    PieChartOutlined,
    MailOutlined,
    DesktopOutlined,
    InboxOutlined,
    AppstoreOutlined,
    BarChartOutlined,
  },
  data() {
    return {
      collapsed: false,
      selectedKeys: ["1"],
      openKeys: ["sub1"],
      preOpenKeys: ["sub1"],
    };
  },
  watch: {
    openKeys(val, oldVal) {
      this.preOpenKeys = oldVal;
    },
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
      this.openKeys = this.collapsed ? [] : this.preOpenKeys;
    },
  },
});
</script>

<style scoped></style>
