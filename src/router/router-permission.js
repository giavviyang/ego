//路由权限
import router from "@/router/index";
import store from '../store'


router.beforeEach((to, from, next) => {
    //1.判断是否需要登录 matched
    if (to.matched.length > 0 && !to.matched.some(record => record.meta.isLogin)) {
        next();  //login  404
    } else {
        //需要登录
        //判断是否已登录  token数据
        if (store.state.loginModule.userinfo.token) {
            next()
        } else {
            next('/login')
        }
    }
})
