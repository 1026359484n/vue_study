<template>
    <div class="vab-logo">
        <vab-icon v-if="logo" :icon="logo"></vab-icon>
        <span class="anticon"></span>
        <span>{{ title }}</span>
    </div>
</template>

<script lang="ts">
    import {defineComponent} from 'vue'
    export default defineComponent({
        name: "logo"
    })
</script>

<style lang="less" scoped>
    .vab-logo {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 32px;
        margin: 16px 5px;
        overflow: hidden;
        overflow: hidden;
        font-size: 15px;
        color: #fff;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
