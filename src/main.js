import Vue from 'vue'
import App from './App.vue'
import VueCountdownTimer from 'vuejs-countdown-timer'

Vue.use(VueCountdownTimer)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
