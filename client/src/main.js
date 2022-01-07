import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faSearch, faEllipsisH} from '@fortawesome/free-solid-svg-icons'
import { faComment,faHeart, faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
    faComment,
    faHeart,
    faHome,
    faSearch,
    faPaperPlane,
    faEllipsisH
  )

  const routes = [
    {
      path: 'client/src/views/Feed.vue',
      name: 'Feed',
      component: Feed
    },
    {
        path: './views/Jam',
        name: 'Jam',
        component: Jam
    },
    {
      path: './views/search',
      name: 'Search',
      component: Search
    },

  ]
  



const app = new App({
  router
}).$mount('#app')


app.component('font-awesome-icon', FontAwesomeIcon)
