<template>
    <div class="vab-tabs">
        <div class="vab-tabs-left-panel">
            <a-tabs
                    @tab-click="handleTabClick"
                    @edit="handleTabRemove"
                    v-model:activeKey="tabActive"
                    hide-add
                    type="editable-card"
            >
                <a-tab-pane
                        v-for="item in visitedRoutes"
                        :key="item.fullPath"
                        :closable="!isAffix(item)"
                        :tab="item.meta.title"
                ></a-tab-pane>
            </a-tabs>
        </div>
        <div class="vab-tabs-right-panel">
            <a-dropdown>
                <template v-slot:overlay>
                    <a-menu @click="handleClick">
                        <a-menu-item key="closeOthersTabs">
                            <a>关闭其他</a>
                        </a-menu-item>
                        <a-menu-item key="closeLeftTabs">
                            <a>关闭左侧</a>
                        </a-menu-item>
                        <a-menu-item key="closeRightTabs">
                            <a>关闭右侧</a>
                        </a-menu-item>
                        <a-menu-item key="closeAllTabs">
                            <a>关闭全部</a>
                        </a-menu-item>
                    </a-menu>
                </template>
                <a-button style="margin-left: 8px">
                    更多
                    <DownOutlined />
                </a-button>
            </a-dropdown>
        </div>
    </div>
</template>

<script>
    export default {
        name: "tabs"
    }
</script>

<style lang="less">
    .vab-tabs {
        padding: 0 @vab-margin;
        background: #ffffff;
        &-left-panel {
            float: left;
            width: calc(100% - 52px - @vab-margin - @vab-margin);
        }
        &-right-panel {
            float: left;
            width: 52px;
        }
        .ant-tabs {
            &-bar {
                margin: 0 !important;
            }
            &-tab {
                height: 32px !important;
                margin-right: 5px !important;
                line-height: 32px !important;
                background: #ffffff !important;
                border: 1px solid #dedede !important;
            }
            &-tab-prev,
            &-tab-next {
                height: 32px !important;
                line-height: 32px !important;
            }
            &-tab-active {
                border: 1px solid #1890ff !important;
                .ant-tabs-close-x {
                    color: #1890ff !important;
                }
            }
        }
    }
</style>
