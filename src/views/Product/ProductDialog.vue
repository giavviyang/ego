<template>
    <el-dialog title="添加商品" :visible.sync="dialogVisible" width="70%">
        <!-- 表单 -->
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
            <el-form-item label="商品图片" prop="image">
                <el-button type="primary" @click="innerVisibleImage=true">上传图片</el-button>
            </el-form-item>
            <el-form-item label="商品描述" prop="descs"></el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <!--<el-button type="primary" @click="closeDialog">取 消</el-button>-->
            <el-button @click=" dialogVisible=false">取 消</el-button>
            <el-button type="primary">确 定</el-button>
        </span>
        <!--  1.内弹框 --- 类目选择 -->
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
        <!--  2.内弹框---上传图片  -->
        <el-dialog
            width="40%"
            title="上传图片"
            :visible.sync="innerVisibleImage"
            append-to-body>
            <ProductUpload/>
            <span slot="footer" class="dialog-footer">
            <!--<el-button @click="innerVisibleImage=false">取 消</el-button>-->
            <el-button type="primary" @click="innerVisibleImage=false">确 定</el-button>
        </span>
        </el-dialog>

    </el-dialog>
</template>
<script>
    import ProductTree from "@/views/Product/ProductTree";
    import ProductUpload from "@/views/Product/ProductUpload";

    export default {
        name: "ProductDialog",
        components: {ProductUpload, ProductTree},
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
                ruleForm: {
                    title: '',
                    price: '',
                    num: '',
                    sellPoint: '',
                    category: '',
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
        methods: {
            // closeDialog() {
            //     this.$emit('closeDialog')
            // }
            changeTree(val) {
                this.ruleForm.category = val.name
            }
        }
    }
</script>

<style lang="less" scoped>
    .category {
        margin-right: 10px;
    }
</style>
