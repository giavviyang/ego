<template>
    <div class="container">
        <div class="login">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="登录" name="login">
                    <el-form :model="ruleForm"
                             status-icon
                             :rules="rules"
                             ref="ruleForm"
                             label-width="40px"
                             class="demo-ruleForm">
                        <el-form-item label="账号" prop="username">
                            <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                            <el-button @click="resetForm('ruleForm')">取消</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="注册" name="register">
                    <el-form :model="ruleForm"
                             status-icon
                             :rules="rules"
                             ref="ruleForm"
                             label-width="40px"
                             class="demo-ruleForm">
                        <el-form-item label="账号" prop="username">
                            <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
                            <el-button @click="resetForm('ruleForm')">取消</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import jwt from "jwt-decode";
    import {mapMutations, mapActions} from 'vuex'

    export default {
        name: "index",
        data() {
            var validateUser = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else {
                    callback();
                }
            }
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            return {
                activeName: "login",
                ruleForm: {
                    username: "",
                    password: "",
                },
                rules: {
                    username: [{validator: validateUser, trigger: 'blur'}],
                    password: [{validator: validatePass, trigger: 'blur'}],
                },

            }
        },
        methods: {
            ...mapMutations('loginModule', ['setUser']),
            ...mapActions('loginModule', ['getLoginActions']),
            handleClick(tab) {
                //切换tab的时候 清空表单输入空
                this.$refs.ruleForm.resetFields();
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    let {username, password} = this.ruleForm
                    if (valid) {
                        // console.log('点击的是谁',this.activeName);
                        // console.log('登录', this.ruleForm);
                        if (this.activeName === 'login') {
                            this.getLoginActions({
                                username,
                                password,
                            })
                            // this.$api.getLogin({
                            //     username,
                            //     password
                            // }).then(res => {
                            //     if(res.status===200){
                            //         console.log(res.data);
                            //         console.log(jwt(res.data.data));
                            //     //    存储vuex
                            //         let temp={
                            //             user: jwt(res.data.data).username,
                            //             token:res.data.data,
                            //             isLogin:Boolean(res.data.data)
                            //         }
                            //         this.setUser(temp);
                            //     //    存储本地
                            //         localStorage.setItem('userToken',JSON.stringify(temp));
                            //     //    跳转
                            //         this.$router.push('/');
                            //     }else {
                            //         console.log('error submit!!');
                            //         return false;
                            //     }
                            // })
                        } else {
                            // console.log('注册')
                            this.$api.register({
                                username,
                                password
                            }).then((res) => {
                                // console.log(res);
                                this.$message({
                                    message: '恭喜你，注册成功，请登录吧',
                                    type: 'success'
                                });
                            })
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
    }


</script>

<style lang="less" scoped>
    .container {
        height: 100%;
        background-color: #eee;
        overflow: hidden;

        .login {
            width: 400px;
            height: 250px;
            background-color: #fff;
            margin: 200px auto;
            border: 1px solid #ddd;
            padding: 20px;
        }

    }

</style>
