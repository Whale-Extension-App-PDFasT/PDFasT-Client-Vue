import Vue from 'vue'
import root from './root.vue'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
// Vue.use(ElementUI)
/* eslint-disable no-new */

export const EventBus = new Vue()
new Vue({
  el: '#root',
  components: { root },
  template: '<root/>'
})
