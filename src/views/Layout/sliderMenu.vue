<template>

    <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isCollapse"
        router>
        <el-menu-item class="info">
            <span slot="title">易购后台管理界面</span>
        </el-menu-item>
        <el-menu-item index="/product">
<!--            <i class="iconfont"> &#xe7b6;</i>-->
            <i class="iconfont icon-chanpinguanli"></i>
            <span slot="title">商品管理</span>
        </el-menu-item>
        <el-menu-item index="/params">
<!--            <i class="iconfont"> &#xe832;</i>-->
            <i class="iconfont icon-guige"></i>
            <span slot="title">规格参数</span>
        </el-menu-item>
        <el-menu-item index="/advert">
<!--            <i class="iconfont"> &#xe634;</i>-->
            <i class="iconfont icon-leimupinleifenleileibie"></i>
            <span slot="title">广告分类</span>
        </el-menu-item>
        <el-menu-item index="/center">
<!--            <i class="iconfont"> &#xe601;</i>-->
            <i class="iconfont icon-gerenzhongxin-zhong"></i>
            <span slot="title">个人中心</span>
        </el-menu-item>
        <el-submenu index="">
            <template slot="title">
<!--                <i class="iconfont"> &#xe688;</i>-->
                <i class="iconfont icon-qita"></i>
                <span slot="title">其他任务</span>
            </template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
            <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项1</el-menu-item>
                <el-menu-item index="2-4-2">选项2</el-menu-item>
                <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
        </el-submenu>
    </el-menu>

</template>

<script>
    export default {
        name: "sliderMenu",
        // data() {
        //     return {
        //         isCollapse: true
        //     }
        // },
        props:{
            isCollapse:{
                type:Boolean,
                default:false
            }
        }
    }
</script>

<style lang="less" scoped>
    .el-menu{
        border-right: 0;
        .info {
            height: 56px;
            line-height: 56px;
            font-size: 16px;
            color: #fff;
            padding: 0 20px;
            box-sizing: border-box;
        }
        .iconfont {
            padding: 0 10px;
        }
    }

</style>

<!--

<template>
    <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
    >
        <el-menu-item index="/product">
            <i class="el-icon-menu"></i>
            <span slot="title">商品管理</span>
        </el-menu-item>
        <el-menu-item index="/params">
            <i class="el-icon-menu"></i>
            <span slot="title">规格参数</span>
        </el-menu-item>
        <el-menu-item index="/advert">
            <i class="el-icon-menu"></i>
            <span slot="title">广告分类</span>
        </el-menu-item>
        <el-menu-item index="/center">
            <i class="el-icon-menu"></i>
            <span slot="title">个人中心</span>
        </el-menu-item>
        <el-submenu index="">
            <template slot="title">
                <i class="el-icon-menu"></i>
                <span>我的工作台</span>
            </template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
            <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项1</el-menu-item>
                <el-menu-item index="2-4-2">选项2</el-menu-item>
                <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
        </el-submenu>
    </el-menu>
</template>

<script>
    export default {
        name: "slide-menu"
    }
</script>

<style scoped>

</style>
-->
