import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// @ts-ignore
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'
// @ts-ignore
import Metro from 'metro4/js/metro'

Vue.use(VueMaterial)
Vue.config.productionTip = false


new Vue({
    router,
    store,
    render: h => h(App),
    mounted() {
    }
}).$mount('#app')
