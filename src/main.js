import Vue from 'vue'
import App from './App.vue'
import vueResource from 'vue-resource'
import Vuelidate from 'vuelidate'
import router from './router'
import store from './store'

Vue.use(vueResource)
Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
