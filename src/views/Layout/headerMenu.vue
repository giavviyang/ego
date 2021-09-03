<template>
    <div class="header">
        <div @click="changeMenu" class="iconfont" :class="flag?'icon-left-indent':'icon-right-indent'"></div>
        <div class="header-right">
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
