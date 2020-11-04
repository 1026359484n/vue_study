<template>
  <div class="avatar">
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

<script lang="ts">
import { defineComponent } from "vue";
import { DownOutlined } from "@ant-design/icons-vue";

import { mapGetters } from "vuex";
export default defineComponent({
  name: "Avatar",
  components: { DownOutlined },
  computed: {
    ...mapGetters({
      avatar: "user/avatar",
      username: "user/username"
    })
  },
  methods: {
    async logout() {
      localStorage.token = null
      /*const fullPath = this.$route.fullPath
        this.$router.push(`/login?redirect=${fullPath}`)*/
      this.$router.push("/login");
    }
  }
});
</script>
<style lang="scss">
.vab-avatar {
  .ant-dropdown-link {
    display: block;
    min-height: 64px;
    cursor: pointer;
  }
}
</style>
