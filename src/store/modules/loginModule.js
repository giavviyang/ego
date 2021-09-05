import api from "../../api"
import jwt from "jwt-decode";
import router from "../../router";
import element from 'element-ui';

export default {
    namespaced: true,
    state: {
        userinfo: {
            user: '',
            token: '',
            isLogin: false
        }

    },
    mutations: {
        setUser(state, params) {
            state.userinfo = params
        }
    },
    actions: {
        async getLoginActions({commit}, params) {
            let res = await api.getLogin(params)
            if (res.data.status === 200) {
                // console.log(res);
                // console.log(jwt(res.data.data));
                // 存储vuex
                let temp = {
                    user: jwt(res.data.data).username,
                    token: res.data.data,
                    isLogin: Boolean(res.data.data)
                }
                commit('setUser', temp);
                //    存储本地
                localStorage.setItem('userToken', JSON.stringify(temp));
                //    跳转
                router.push('/');
            } else {
                // console.log('错误');
                element.Message.error('错误')
            }
        }
    },
    getters: {}
}


