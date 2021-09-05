<template>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="70%" :before-close="handleClose">
        <!-- 1.表单 -->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="类目选择">
                <el-button type="primary" @click="innerVisible=true" class="category">选择类目</el-button>
                {{ ruleForm.category }}
            </el-form-item>
            <el-form-item label="商品名称" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="price">
                <el-input v-model="ruleForm.price"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="num">
                <el-input v-model="ruleForm.num"></el-input>
            </el-form-item>
            <el-form-item label="商品卖点" prop="sellPoint">
                <el-input v-model="ruleForm.sellPoint"></el-input>
            </el-form-item>
            <el-form-item label="商品图片" prop="image" :class="{productImage:flag}">
                <el-button type="primary" @click="innerVisibleImage=true">上传图片</el-button>
                <img :src="ruleForm.image" :class="{uploadImg:flag}" alt="">
            </el-form-item>
            <el-form-item label="商品描述" prop="descs">
                <!-- 商品描述，富文本，王编译器-->
                <ProductWangeditor @wangeditorData="wangeditorData" ref="wangEditor"/>
            </el-form-item>
        </el-form>
        <!--  2.内弹框 --- 类目选择 -->
        <el-dialog
            width="40%"
            title="选择类目"
            :visible.sync="innerVisible"
            append-to-body>
            <ProductTree @changeTree="changeTree"/>
            <span slot="footer" class="dialog-footer">
            <!--<el-button type="primary" @click="closeDialog">取 消</el-button>-->
            <el-button @click="innerVisible=false">取 消</el-button>
            <el-button type="primary" @click="innerVisible=false">确 定</el-button>
        </span>
        </el-dialog>
        <!--  3.内弹框---上传图片  -->
        <el-dialog
            width="40%"
            title="上传图片"
            :visible.sync="innerVisibleImage"
            append-to-body>
            <ProductUpload @uploadImage="uploadImage"/>
            <span slot="footer" class="dialog-footer">
            <!--<el-button @click="innerVisibleImage=false">取 消</el-button>-->
            <el-button type="primary" @click="innerVisibleImage=false">确 定</el-button>
        </span>
        </el-dialog>
        <!--  4.底部  弹框按钮-->
        <span slot="footer" class="dialog-footer">
            <!--<el-button type="primary" @click="closeDialog">取 消</el-button>-->
            <el-button @click="clearForm('ruleForm')">取 消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
    import ProductTree from "@/views/Product/ProductTree";
    import ProductUpload from "@/views/Product/ProductUpload";
    import ProductWangeditor from "@/views/Product/ProductWangeditor";

    export default {
        name: "ProductDialog",
        components: {ProductWangeditor, ProductUpload, ProductTree},
        // props:{
        //     dialogVisible: {
        //         type:Boolean,
        //         default:false
        //     }
        // },
        data() {
            return {
                dialogVisible: false,
                innerVisible: false,
                innerVisibleImage: false,
                flag: false,
                ruleForm: {
                    title: '',
                    price: '',
                    num: '',
                    sellPoint: '',
                    category: '',
                    image: '',
                    desc: '',
                    cid: '',
                    id: ''
                },
                rules: {
                    title: [
                        {required: true, message: '请输入商品名称', trigger: 'blur'},
                    ],
                    price: [
                        {required: true, message: '请输入商品价格', trigger: 'blur'},
                    ],
                    num: [
                        {required: true, message: '请输入商品数量', trigger: 'blur'},
                    ],
                    sellPoint: [
                        {required: false, message: '请输入商品卖点', trigger: 'blur'},
                    ],

                }
            };
        },
        props: {
            rowData: {
                type: Object,
                default: function () {
                    return {}
                }
            },
            title: {
                type: String,
                default: '标题'
            }
        },
        //监听数据变化
        watch: {
            rowData(val) {
                this.$nextTick(res => {
                    // console.log('监听', val);
                    this.ruleForm = val;
                    this.ruleForm.desc = val.descs;
                    //   设置商品描述值  富文本   王编译  延迟加载 this.$nextTick(res)
                    this.$refs.wangEditor.editor.txt.html(val.descs);
                    // this.$parent.http(1);
                })
            }
        },
        methods: {
            // closeDialog() {
            //     this.$emit('closeDialog')
            // }
            /**
             * 回传类目选择
             * @param val
             */
            changeTree(val) {
                this.ruleForm.category = val.name
                this.ruleForm.cid = val.cid
            },
            /**
             * 点击上传图片，回显
             * @param val
             */
            uploadImage(val) {
                // console.log(val);
                // let imgUrl='http://localhost:3000'+'/'+val.slice(7);
                // console.log(imgUrl);
                // this.ruleForm.image=imgUrl
                this.ruleForm.image = val;
                this.flag = true
            },
            /**
             * 商品描述，获取富文本编译内容
             */
            wangeditorData(val) {
                // console.log(val);
                this.ruleForm.desc = val;
            },
            /**
             * 弹框  底部确定按钮
             * @param formName
             */
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // console.log(this.ruleForm);
                        let {title, image, sellPoint, price, cid, category, num, desc, id} = this.ruleForm
                        if (this.title === '添加商品') {
                            this.$api.getInsertTbItem({
                                title,
                                image,
                                sellPoint,
                                price,
                                cid,
                                category,
                                num,
                                desc
                            }).then((res) => {
                                // console.log(res);
                                if (res.status === 200) {
                                    //   1.提示信息
                                    this.$message({
                                        message: '恭喜你，添加商品成功',
                                        type: 'success'
                                    });
                                    //   2.更新列表
                                    this.$parent.http(1);
                                    //    3.隐藏弹框   清空表单
                                    this.clearForm(formName)
                                } else {
                                    this.$message.error('很遗憾，添加商品失败');
                                }
                            })
                        } else {
                            // console.log('编辑商品')
                            this.$api.updateTbItem({
                                title,
                                image,
                                sellPoint,
                                price,
                                cid,
                                category,
                                num,
                                desc,
                                id
                            }).then(res => {
                                if (res.status === 200) {
                                    //   1.提示信息
                                    this.$message({
                                        message: '恭喜你，编辑商品成功',
                                        type: 'success'
                                    });
                                    //   2.更新列表
                                    this.$parent.http(1);
                                    //    3.隐藏弹框   清空表单
                                    this.clearForm(formName)
                                } else {
                                    this.$message.error('很遗憾，编辑商品失败');
                                }
                            })
                        }

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            /**
             * 隐藏弹框   清空表单
             * 清空 方法1：初始化表单    方法2：使用element清空表单
             */
            clearForm(formName) {
                //1.隐藏弹框
                this.dialogVisible = false
                //2.清空表单
                this.$refs[formName].resetFields();
                //3.清空富文本  王编译内容
                this.$refs.wangEditor.editor.txt.clear();
            },
            /**
             * 关闭弹框  关闭按钮
             */
            handleClose() {
                this.$confirm('确认关闭？')
                    .then(() => {
                        this.clearForm('ruleForm');
                    })
                    .catch(() => {
                    });
            }
        }
    }
</script>

<style lang="less" scoped>
    .category {
        margin-right: 10px;
    }

    .productImage {
        margin: 70px 0;

        .uploadImg {
            margin-left: 20px;
            height: 150px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
        }
    }
</style>
