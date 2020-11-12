import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/pages/Home';
const Profile = () => import(/* webpackChunkName: "profile" */'@/pages/Profile');
const NewProject = () => import(/* webpackChunkName: "new-project" */'@/pages/NewProject');

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/projects/new',
    name: 'New Project',
    component: NewProject
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
