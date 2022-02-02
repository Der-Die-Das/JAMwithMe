import Vue from 'vue'
import VueRouter from 'vue-router'
import Feed from '../views/Feed.vue'
import Jam from '../views/Jam.vue'
import Post from '../views/Post.vue'
import Search from '../views/Search.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Profile from '../views/Profile.vue'
import otherProfile from '../views/otherProfile.vue'
import Tag from '../views/Tag.vue'


Vue.use(VueRouter)

const routes = [
    {
      path: '/Feed',
      name: 'Feed',
      component: Feed
    },
    {
    path: '/Jam',
    name: 'Jam',
    component: Jam
  },
    {
    path: '/Post',
    name: 'Post',
    component: Post
  },
    {
    path: '/Search',
    name: 'Search',
    component: Search
  },
    {
    path: '/Login',
    name: 'Login',
    component: Login
  },
    {
    path: '/Register',
    name: 'Register',
    component: Register
  },

    {
    path: '/Profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/otherProfile',
    name: 'otherProfile',
    component: otherProfile
  },
  {
    path: '/tag',
    name: 'tag',
    component: Tag
  }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })
  
  export default router
