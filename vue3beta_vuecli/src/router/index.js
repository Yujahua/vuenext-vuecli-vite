import { createRouter, createWebHistory } from 'vue-router'
// there is also createWebHashHistory and createMemoryHistory
import * as demo from './demo-index'

import components from '../../examples/components.json'

import {registerRoute} from './registerRoute'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: demo["Home"]
  },
  {
    path: '/category',
    name: 'Category',
    component: demo['Category']
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/',
    redirect: '/home'
  }
].concat(registerRoute(components, demo))

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
