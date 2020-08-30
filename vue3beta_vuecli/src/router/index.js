import { createRouter, createWebHistory } from 'vue-router'
// there is also createWebHashHistory and createMemoryHistory
import * as demo from './demo-index'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: demo["Home"]
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
    path: '/category',
    name: 'Category',
    component: () => import(/* webpackChunkName: "about" */ '../views/Category.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
