import Vue from 'vue'
import VueRouter from 'vue-router'
import Feed from '../views/Feed.vue'
import Jam from '../views/Jam.vue'
//import Post from '../views/Post.vue'
import Search from '../views/Search.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Profile from '../views/Profile.vue'
import otherProfile from '../views/otherProfile.vue'
//import Tag from '../views/Tag.vue'


Vue.use(VueRouter)

const routes = [
  { path: '*', redirect: '/feed' },
  {
    path: '',
    component: Feed
  },

  {
    path: '/feed',
    name: 'Feed',
    component: Feed
  },

  {
    path: '/jam',
    name: 'Jam',
    component: Jam
  },

  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },

  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/otherProfile',
    name: 'otherProfile',
    component: otherProfile
  },
  // {
  //   path: '/tag',
  //   name: 'tag',
  //   component: Tag
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
