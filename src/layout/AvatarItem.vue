<template>
    <div class="avatar-item">
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
    import router from "@/router";
    import { DownOutlined } from '@ant-design/icons-vue'

    export default defineComponent({
        name: "avatar",
        components: { DownOutlined },
        methods: {
            logout() {
                localStorage.removeItem('token')
                localStorage.removeItem('username')
                router.push('/login')
            },
        },
        computed: {
            avatar: function (){
                return "https://qlogo1.store.qq.com/qzone/1026359484/1026359484/100?1310662599"
            },
            username: function () {
                return localStorage.getItem('username')
            }
        }
    });
</script>

<style lang="less">
    .avatar-item {
        .ant-dropdown-link {
            display: block;
            min-height: 64px;
            cursor: pointer;
        }
    }
</style>
