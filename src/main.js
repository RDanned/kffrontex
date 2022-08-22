import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/libs/bootstrap/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@/assets/css/tooltip.css'
import '@/assets/css/element.css'
import {Plugin} from 'vue-fragment'
import UUID from 'vue-uuid'
import VueI18n from 'vue-i18n'
import ru from '@/lang/ru'
import en from '@/lang/en'
import kz from '@/lang/kz'
import VueTheMask from 'vue-the-mask'
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import VTooltip from 'v-tooltip'

library.add(fas)

const VueUploadComponent = require('vue-upload-component')
Vue.component('file-upload', VueUploadComponent)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VTooltip)
Vue.use(VueTheMask)
Vue.use(Plugin)
Vue.use(UUID)
Vue.use(VueI18n)
Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/ru-RU'
Vue.use(ElementUI, { locale });

const i18n = new VueI18n({
  locale: 'ru',
  messages: {
    en: {
      ...en,
    },
    ru: {
      ...ru,
    },
    kz: {
      ...kz,
    },
  },
})

new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
