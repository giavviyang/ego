<template>
    <div class="product">
        <!-- 1.搜索框 -->
        <div class="header">
            <el-input v-model="input" placeholder="请输入查询内容" @change="changeInput"></el-input>
            <el-button type="primary" @click="searchInput">查询</el-button>
            <el-button type="primary" @click="addProduct">添加</el-button>
        </div>
        <!-- 4.弹框 -->
        <!--<ProductDialog :dialogVisible="dialogVisible"  @closeDialog="closeDialog"/>-->
        <ProductDialog ref="myDialog"/>
        <!-- 2.数据表格列表 -->
        <el-table :data="tableData" style="width: 100%">
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="id" label="商品ID" width="110"></el-table-column>
            <el-table-column prop="title" label="商品名称" width="110" show-overflow-tooltip></el-table-column>
            <el-table-column prop="price" label="商品价格" width="110"></el-table-column>
            <el-table-column prop="num" label="商品数量" width="110"></el-table-column>
            <el-table-column prop="category" label="规格类目" width="110" show-overflow-tooltip></el-table-column>
            <el-table-column prop="image" label="商品图片" show-overflow-tooltip></el-table-column>
            <el-table-column prop="sellPoint" label="商品卖点" show-overflow-tooltip></el-table-column>
            <el-table-column prop="descs" label="商品描述" show-overflow-tooltip></el-table-column>
            <el-table-column label="商品操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--3.分页 -->
        <div class="page">
            <Pagination :page-size="pageSize" :total="total" @currentPage="getCurrentPages"/>
        </div>
    </div>
</template>

<script>
    import Pagination from '../../components/Pagination'
    import ProductDialog from "@/views/Product/ProductDialog";

    export default {
        name: "index",
        components: {
            ProductDialog,
            Pagination
        },
        data() {
            return {
                tableData: [],
                pageSize: 1,
                total: 10,
                input: '',
                dialogVisible:false
            }
        },
        created() {
            // this.$api.productList({page:1}).then((res)=>{
            //     console.log(res.data);
            //     this.tableData=res.data.data;
            //     this.pageSize=res.data.pageSize;
            //     this.total=res.data.total;
            // })
            this.http(1)
        },
        methods: {
            // 搜索框功能  失去焦点，回车
            changeInput(val) {
                this.search(val);
            },
            // 搜索框功能  点击搜素按钮
            searchInput() {
                this.search(this.input);
            },
            // 添加商品
            addProduct(){
                // this.dialogVisible=true
                this.$refs.myDialog.dialogVisible=true
            },
            // 关闭弹框
            // closeDialog(){
            //     this.dialogVisible=false;
            // },
            handleEdit() {

            },
            handleDelete() {

            },
            // 获取点击的页码
            getCurrentPages(val) {
                console.log(val);
                this.http(val)
            },
            // 网络请求搜索数据
            search(val) {
                if (val) {
                    this.$api.search({search: val}).then((res) => {
                        // if (res.status === 200) {
                        if (res.data.result) {
                            // console.log(res.data);
                            this.tableData = res.data.result;
                            this.pageSize = 8;
                            this.total = res.data.result.length
                        } else {
                            this.tableData = [];
                            this.pageSize = 1;
                            this.total = 1;
                        }
                    })
                } else {
                    this.http(1);
                }
            },
            // 网络请求动态列表数据
            http(page) {
                // window.location.reload();
                this.$api.productList({page}).then((res) => {
                    // console.log(res.data);
                    this.tableData = res.data.data;
                    this.pageSize = res.data.pageSize;
                    this.total = res.data.total;

                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .product {
        padding: 10px;

        .header {
            display: flex;
            padding: 10px;

            button {
                margin-left: 20px;
            }
        }

        .page {
            text-align: center;
            margin-top: 10px;
        }
    }


</style>
