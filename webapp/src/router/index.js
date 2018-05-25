import Vue from 'vue'
import Router from 'vue-router'
import Suggestions from '@/components/Suggestions'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Suggestion',
      component: Suggestions
    }
  ]
})
