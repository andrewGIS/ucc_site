// import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { store } from './store/Store'
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

// import VueSidebarMenu from 'vue-sidebar-menu'

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
// import GraphicBuilder from './GraphicBuilder'
// import { library, dom } from '@fortawesome/fontawesome-svg-core'
// import { faUser } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import store from '../store/Store'
// import { mapState } from 'vuex'

// library.add(faUser)

// Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
// Vue.use(VueSidebarMenu)
Vue.use(Vuex)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
