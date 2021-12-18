import { createApp } from 'vue'
import App from './App.vue'

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
const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
