import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ],
  mode: 'history',
  scrollBehavior: function (to, from, savedPosition) {
      return savedPosition || { x: 0, y: 0 }
  },
})
