import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// @ts-ignore
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import {library} from '@fortawesome/fontawesome-svg-core'
import * as fas from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

Vue.use(VueMaterial)
// @ts-ignore
library.add(fas.faHeart)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false


new Vue({
    router,
    store,
    render: h => h(App),
    mounted() {
    }
}).$mount('#app')
