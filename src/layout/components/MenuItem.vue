<template>
  <a-menu-item :key="routeChildren.path" @click="handleLink">
    <span class="anticon">
      <!--<vab-icon :icon="routeChildren.meta.icon"></vab-icon>-->
    </span>
    <span>{{ routeChildren.meta.title }}</span>
  </a-menu-item>
</template>

<script lang="ts">
import { isExternal } from "@/utils/validate";
import VabIcon from "@/layout/icon.vue";
import {defineComponent} from "vue";
import router from "@/router";
export default defineComponent({
  name: "MenuItem",
  //components: { VabIcon },
  props: {
    item: {
      type: Object,
      default() {
        return null;
      }
    },
    routeChildren: {
      type: Object,
      default: () => null
    }
  },
  methods: {
    handleLink() {
      let path = this.item.path;
      if (!path.endsWith("/")) {
        path = path.concat("/")
      }
      router.push(path+this.routeChildren.path);
      //const routePath = this.routeChildren.path;
      //const target = this.routeChildren.meta.target;
      /*if (target === "_blank") {
        if (isExternal(routePath)) window.open(routePath);
        else if (this.$route.path !== routePath) window.open(routePath.href);
      } else {
        debugger
        if (isExternal(routePath)) {
          window.location.href = routePath;
        } else if (this.$route.path !== routePath) {
          router.push(routePath);
        }
      }*/
    }
  }
});
</script>
