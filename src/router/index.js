import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout'
import Login from '../views/Login'
import Error from '../views/Error'
import store from '../store'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        // name: 'Layout',
        component: Layout,
        redirect:'/product',
        children: [
            {
                path: 'product',
                name: 'Product',
                component: () => import('../views/Product')
            },
            {
                path: 'params',
                name: 'Params',
                component: () => import('../views/Params')
            },
            {
                path: 'advert',
                name: 'Advert',
                component: () => import('../views/Advert')
            },
            {
                path: 'center',
                name: 'Center',
                component: () => import('../views/Center')
            }
        ],
        meta: {
            isLogin: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '*',
        name: 'Error',
        component: Error
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})



export default router
