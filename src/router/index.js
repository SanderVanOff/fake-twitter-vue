import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {layout: 'default', auth: true},
  },
  {
    path: '/my-post',
    name: 'MyPost',
    component: () => import('../views/MyPost.vue'),
    props: true,
    meta: {layout: 'default', auth: true},
  },
  {
    path: '/likes-post',
    name: 'LikesPost',
    component: () => import('../views/LikesPost.vue'),
    props: true,
    meta: {layout: 'default', auth: true},
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth/Login.vue'),
    props: true,
  },
  {
    path: '/registration',
    name: 'Registration',
    component: () => import('../views/auth/Registration.vue'),
    props: true,
  },
  {
    path: '/*',
    name: 'Error',
    component: () => import('../views/Error.vue'),
    props: true,
  }
]

const router = new VueRouter({
  routes, mode: 'history',
})

export default router
