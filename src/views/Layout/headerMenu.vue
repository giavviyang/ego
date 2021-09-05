<template>
    <div class="header">
        <div @click="changeMenu" class="iconfont" :class="flag?'icon-left-indent':'icon-right-indent'"></div>
        <div class="header-right">
            <el-dropdown trigger="click" @command="selectLang">
                <span class="el-dropdown-link">
                选择语言<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="zh">中文</el-dropdown-item>
                    <el-dropdown-item command="en">English</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <span>hello <i>{{ userinfo.user }}</i></span>
            <span class="iconfont icon-tuichu" @click="exit"></span>
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex';

    export default {
        name: "headerMenu",
        data() {
            return {
                flag: false
            }
        },
        computed: {
            ...mapState('loginModule', ['userinfo'])
        },
        methods: {
            ...mapMutations('loginModule', ['setUser']),

            changeMenu() {
                this.flag = !this.flag
                this.$emit('toggleMenu', this.flag)
            },
            //选择语言
            selectLang(command){
                console.log(command);
                this.$i18n.locale=command;
            },
            //退出按钮
            exit() {
                this.setUser({
                    userinfo: {
                        user: '',
                        token: '',
                        isLogin: false
                    }
                });
                localStorage.removeItem('userToken');
                this.$router.push('/login');
                window.location.reload();
            }
        }
    }
</script>

<style lang="less" scoped>
    .header {
        //width: 100%;
        background-color: #1e78bf;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .iconfont {
            font-size: 30px;
            color: #fff;
            margin: 5px;
        }

        .header-right {
            color: #fff;

            .el-dropdown {
                color: #fff;
                margin-right: 10px;
            }

            i {
                margin: 0 10px;
                font-style: normal;
            }

            .iconfont {
                font-size: 20px;
                position: relative;
                top: 2px;
                right: 5px;
            }
        }
    }


</style>
