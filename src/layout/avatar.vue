<template>
  <div class="vab-avatar">
    <a-dropdown>
      <span class="ant-dropdown-link">
        <a-avatar :src="avatar" />
        {{ username }}
        <DownOutlined />
      </span>
      <template v-slot:overlay>
        <a-menu>
          <a-menu-item @click="logout">退出登录</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { DownOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  name: "avatar",
  components: { DownOutlined },
  methods: {
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push('/login')
    },
  },
});
</script>

<style lang="less">
.vab-avatar {
  .ant-dropdown-link {
    display: block;
    min-height: 64px;
    cursor: pointer;
  }
}
</style>
