import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'welcome',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  // },
  // 主页
  /*{
    path: '/',
    name: 'home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Home.vue')
  },*/
  /*{
    path: '/',
    name: 'list',
    component: List
  },*/
  {
    path: '/',
    name: 'test',
    component: () => import('../views/Test.vue')
  },
  {
    path: '/graph',
    name: 'graph',
    component: () => import('../views/Graph.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
