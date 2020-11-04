<template>
  <a-layout-header class="vab-header">
    <a-row>
      <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
      </a-col>
    </a-row>
    <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
      <avatar/>
    </a-col>
  </a-layout-header>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { ref, reactive } from "vue";
import Avatar from './components/avatar.vue'

export default defineComponent({
  name: "Header",
  components: {
    Avatar
  },
  setup(props) {
    const selectedKeys = reactive(["1"]);
    const collapsed = ref(true);
    return {
      selectedKeys,
      collapsed
    };
  }
});
</script>

<style lang="less">
  .vab-layout-wrap {
    .vab-sider {
      position: fixed;
      left: 0;
      height: 100vh;
      overflow: auto;
      .vab-menu {
        height: calc(100vh - @vab-header-height);
      }
    }
    .vab-layout {
      padding-left: 250px;
      transition: all 0.2s;
    }
    .vab-mobile-layout {
      padding-left: 0;
      transition: all 0.2s;
    }
    .vab-collapse {
      .vab-logo .anticon + span {
        display: inline-block;
        max-width: 0;
        opacity: 0;
        transition: all 0.2s;
      }
      & + .vab-layout {
        padding-left: 81px;
        transition: all 0.2s;
      }
    }
    .vab-mask {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 998;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      background: #000;
      opacity: 0.5;
    }
    .vab-mobile {
      position: fixed !important;
      z-index: 999;
      &.vab-collapse {
        width: 0 !important;
        min-width: 0 !important;
        max-width: 0 !important;
        * {
          display: none !important;
          width: 0 !important;
          min-width: 0 !important;
          max-width: 0 !important;
        }
        .ant-menu-item,
        .ant-menu-submenu {
          display: none !important;
          width: 0 !important;
          min-width: 0 !important;
          max-width: 0 !important;
        }
        & + .vab-layout {
          padding-left: 0px !important;
          transition: all 0.2s;
        }
      }
    }
    .vab-header {
      padding: 0;
      background: #fff;
      .ant-col + .ant-col {
        display: flex;
        justify-content: flex-end;
        padding: 0 @vab-padding;
      }
      .trigger {
        height: @vab-header-height;
        padding: 0 @vab-padding;
        font-size: 18px;
        line-height: @vab-header-height;
        cursor: pointer;
        transition: color 0.3s;
        &:hover {
          color: #1890ff;
        }
      }
    }
  }
</style>
