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
        <ProductDialog ref="myDialog" :rowData="rowData" :title="title"/>
        <!-- 2.数据表格列表 -->
        <el-table class="productList" :data="tableData" ref="myTable" @selection-change="selectionChange">
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="id" label="商品ID" width="110"></el-table-column>
            <el-table-column prop="title" label="商品名称" width="110" show-overflow-tooltip></el-table-column>
            <el-table-column prop="price" label="商品价格" width="110"></el-table-column>
            <el-table-column prop="num" label="商品数量" width="110"></el-table-column>
            <el-table-column prop="category" label="规格类目" width="110" show-overflow-tooltip></el-table-column>
            <el-table-column prop="image" label="商品图片" show-overflow-tooltip></el-table-column>
            <el-table-column prop="sellPoint" label="商品卖点" show-overflow-tooltip></el-table-column>
            <el-table-column prop="descs" label="商品描述" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作">
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
        <!-- 按钮  批量删除 -->
        <div style="margin-top: 20px">
            <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
            <el-button @click="toggleSelection()">取消选择</el-button>
            <el-button @click="deleteSelection()">批量删除</el-button>
        </div>
        <!-- 3.分页 -->
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
                pageSize: 1,  //每页多少条
                total: 10,  //页码总条数
                input: '',  //输入框值
                // dialogVisible: false,  //弹框状态
                idArr: [],  //id数组
                rowData:{},  //当前行数据
                title:'弹框标题',  //弹框标题
            }
        },
        created() {
            this.http(1)
        },
        methods: {
            /**
             *  搜索框功能  失去焦点，回车
             * @param val
             */
            changeInput(val) {
                this.search(val);
            },
            /**
             *  搜索框功能  点击搜素按钮
             */
            searchInput() {
                this.search(this.input);
            },
            /**
             *  添加商品
             */
            addProduct() {
                // this.dialogVisible=true
                this.$refs.myDialog.dialogVisible = true;
                this.title='添加商品'
            },
            /**
             *  关闭弹框
             */
            // closeDialog(){
            //     this.dialogVisible=false;
            // },
            /**
             * 操作 编辑按钮
             * @param index
             * @param row
             */
            handleEdit(index, row) {
                // 显示弹框
                this.$refs.myDialog.dialogVisible = true;
                // 显示数据  把当前行的数据传递给子组件弹框
                // console.log(row);
                // this.rowData=row;
                this.rowData=Object.assign({},row);
                this.title='编辑商品'

            },
            /**
             * 操作  删除按钮
             * @param index
             * @param rowData
             */
            handleDelete(index, rowData) {
                // console.log(index, rowData);
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.deleteItemById({id: rowData.id}).then((res) => {
                        // console.log(res)
                        if (res.data.status === 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            //    更新视图
                            this.http(1);
                        } else {
                            this.$message.error('删除失败！');
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            /**
             * 取消选择按钮
             * @param rows
             */
            toggleSelection(rows) {
                if (rows) {  //切换行显示
                    rows.forEach(row => {
                        this.$refs.myTable.toggleRowSelection(row);
                    });
                } else {  //取消按钮
                    this.$refs.myTable.clearSelection();
                }
            },
            /**
             * 批量删除
             * @param val
             */
            deleteSelection() {
                // console.log('删除')
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.batchDelete({
                        idArr: this.idArr
                    }).then((res) => {
                        if (res.data.status === 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            //    更新视图
                            this.http(1);
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            /**
             * 选择
             * @param selection
             */
            selectionChange(selection) {
                // console.log('selection',selection);
                let arr = [];
                selection.forEach(ele => {
                    arr.push(ele.id)
                });
                // console.log(arr);
                this.idArr = arr;
            },
            /**
             * 获取点击的页码
             * @param val
             */
            getCurrentPages(val) {
                // console.log(val);
                this.http(val)
            },
            /**
             *  网络请求搜索数据
             * @param val
             */
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
            /**
             *  网络请求搜索数据
             * @param page  页码
             */
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
        padding: 0 10px;

        .header {
            display: flex;
            padding: 10px;

            button {
                margin-left: 20px;
            }
        }

        .productList {
            width: 100%;
        }

        .page {
            text-align: center;
            margin-top: 20px;

            .el-pagination {
                padding: 0 5px;
            }
        }
    }


</style>
