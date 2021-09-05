import axios from "../utils/request";
import base from "@/api/base";

const api={
    /**
     * 登录  username  password
     */

    getLogin(params){
        // return axios.post(base.baseUrl+base.login,params);
        return axios.post(base.login,params);
    },
    /**
     * 注册接口
     */
    register(params){
        return axios.post(base.register,params);
    },
    /**
     * 商品列表
     */
    productList(params){
        return axios.get(base.productList,{params});
    },
    /**
     * 搜索查询数据
     */
    search(params){
        return axios.get(base.search,{params});
    },
    /**
     * 类目选择  id (传递 cid)
     *
     */
    selectItemCategory(params){
        return axios.get(base.selectItemCategory,{params});
    },
    /**
     * 商品添加
     *@param params  title, image, sellPoint, price, cid,category, num, desc,paramsInfo
     */
    getInsertTbItem(params){
        return axios.get(base.insertTbItem,{params});
    },
    /**
     * 商品删除
     *@param params  title, image, sellPoint, price, cid,category, num, desc,paramsInfo
     */
    deleteItemById(params){
        return axios.get(base.deleteItemById,{params});
    },
    /**
     * 批量删除
     *@param params  idArr=[]
     */
    batchDelete(params){
        return axios.get(base.batchDelete,{params});
    },
    /**
     * 修改商品
     *@param params  title, sellPoint, price, cid,category,num, desc, paramsInfo,image, id
     */
    updateTbItem(params){
        return axios.get(base.updateTbItem,{params});
    },

}

export default api
