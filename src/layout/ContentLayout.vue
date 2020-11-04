<template>
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
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "ContentLayout"
});
</script>

<style scoped></style>
