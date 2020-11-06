<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <sider-left/>
      <!--<a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
        <router-link to="/">
          <a-menu-item key="1">
            <user-outlined />
            <span>首页</span>
          </a-menu-item>
        </router-link>
        <router-link to="/device">
          <a-menu-item key="2">
            <video-camera-outlined/>
            <span>设备管理</span>
          </a-menu-item>
        </router-link>
        <router-link to="/user">
          <a-menu-item key="3">
            <upload-outlined />
            <span>用户管理</span>
          </a-menu-item>
        </router-link>
        <router-link to="/websocket">
          <a-menu-item key="4">
            <upload-outlined />
            <span>Websocket</span>
          </a-menu-item>
        </router-link>
      </a-menu>-->
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <!--<menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />-->
        <a-button
          type="primary"
          @click="toggleCollapsed"
          style="margin-bottom: 16px"
        >
          <MenuUnfoldOutlined v-if="collapsed" />
          <MenuFoldOutlined v-else />
        </a-button>
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px'
        }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from "@ant-design/icons-vue";
import { defineComponent } from "vue";
import SiderLeft from "./SiderLeft.vue";

export default defineComponent({
  components: {
    /*UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,*/
    SiderLeft,
    MenuUnfoldOutlined,
    MenuFoldOutlined
  },
  data() {
    return {
      selectedKeys: ["1"],
      collapsed: false,
      openKeys: ["sub1"],
      preOpenKeys: ["sub1"]
    };
  },
  watch: {
    openKeys(val, oldVal) {
      this.preOpenKeys = oldVal;
    }
  },
  methods: {
    handleLink() {
      //router.push
    },
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
      this.openKeys = this.collapsed ? [] : this.preOpenKeys;
    }
  }
});
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
