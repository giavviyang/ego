const base = {
    baseUrl: 'http://localhost:3000',
    login: '/api/api/login',   //登录
    register: '/api/api/register',  //注册
    productList: '/api/api/projectList',  //商品列表
    search: '/api/api/search',   //搜索查询
    selectItemCategory: "/api/api/backend/itemCategory/selectItemCategoryByParentId",  //类目选择
    upload: '/api/upload',  //上传图片接口
    insertTbItem: '/api/api/backend/item/insertTbItem',  //商品添加
    deleteItemById: '/api/api/backend/item/deleteItemById',  //删除商品
    batchDelete: '/api/api/batchDelete',  //批量删除
    updateTbItem:'/api/api/backend/item/updateTbItem',  //修改商品
}

export default base
