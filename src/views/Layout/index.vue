<template>
    <div class="layout">
        <!-- 左侧导航 -->
        <SliderMenu class="sliderNav el-menu-vertical-demo" :isCollapse="flag"/>
        <!-- 顶部导航 -->
        <HeaderMenu class="header" @toggleMenu="toggleMenu"/>
        <!-- 右侧内容 -->
        <LayoutContent class="main-content" :class="{content:flag}"/>
    </div>
</template>

<script>
    import HeaderMenu from "@/views/Layout/headerMenu";
    import SliderMenu from "@/views/Layout/sliderMenu";
    import LayoutContent from "@/views/Layout/layoutContent";

    export default {
        name: "index",
        components: {LayoutContent, SliderMenu, HeaderMenu},
        data() {
            return {
                flag: false
            }
        },
        methods: {
            toggleMenu(val) {
                // console.log(val);
                this.flag = val
            }
        }
    }
</script>

<style lang="less" scoped>
    .layout {
        height: 100%;
        justify-content: flex-start;

        .el-menu-vertical-demo:not(.el-menu--collapse) {
            width: 220px;
        }

        .sliderNav {
            height: 100%;
            background-color: #999;
            float: left;
            overflow: hidden;
        }

        .header {
            height: 50px;
            line-height: 50px;
            border-bottom: 1px solid #eee;
        }

        .main-content {
            margin-left: 220px;
        }

        .content {
            margin-left: 64px;
        }
    }
</style>

