import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      component: resolve => require(['../view/layout/home.vue'], resolve),
      children: [
        {
          path: '/map',
          name: 'map',
          component: resolve => require(['../view/map/index.vue'], resolve)
        },
        {
          path: '/user',
          name: 'user',
          component: resolve => require(['../view/user/index.vue'], resolve)
        },
        {
          path: '/user_create',
          name: 'user_create',
          component: resolve => require(['../view/user/create.vue'], resolve)
        }
      ]
    },
    {
      path: '/',
      component: resolve => require(['../view/test1.vue'], resolve)
    },
  ]
})
