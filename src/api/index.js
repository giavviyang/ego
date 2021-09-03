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
     * @param params
     * @return {Promise<AxiosResponse<any>>}
     */
    selectItemCategory(params){
        return axios.get(base.selectItemCategory,{params});
    }
}

export default api
