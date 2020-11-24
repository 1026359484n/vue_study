<template>
  <div>
    <a-pagination
      show-size-changer
      v-model:current="current"
      v-model:pageSize="pageSize"
      :total="500"
      @showSizeChange="onShowSizeChange"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const current = ref(1);
    const pageSize = ref(20);
    return {
      current,
      pageSize
    };
  },
  watch: {
    pageSize(val) {
      console.log("pageSize", val);
    },
    current(val) {
      console.log("current", val);
    }
  },
  methods: {
    onShowSizeChange(current: number, pageSize: number) {
      console.log(current, pageSize);
    }
  }
});
</script>
