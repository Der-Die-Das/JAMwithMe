import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'


import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faSearch, faEllipsisH, faUpload, faUndo, faRecordVinyl, faPause, faPlay} from '@fortawesome/free-solid-svg-icons'
import { faComment,faHeart, faPaperPlane,faPauseCircle, faPlayCircle, faFolder, faImage } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faComment,
  faHeart,
  faHome,
  faSearch,
  faPaperPlane,
  faEllipsisH,
  faUpload,
  faPauseCircle,
  faPlayCircle,
  faPause,
  faPlay,
  faUndo,
  faFolder,
  faRecordVinyl,
  faImage
  )
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
