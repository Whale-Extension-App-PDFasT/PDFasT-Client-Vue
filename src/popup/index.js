import Vue from 'vue'
import root from './root.vue'
import VueTour from 'vue-tour'
import '@accordion/acc-components/dist/themes/light.css'

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

require('vue-tour/dist/vue-tour.css')

Vue.use(VueTour)

Vue.config.productionTip = false
Vue.config.ignoredElements = [/^acc-/]
Vue.config.ignoredElements = [/^sl-/]
// Vue.use(ElementUI)
/* eslint-disable no-new */

export const EventBus = new Vue()
new Vue({
  el: '#root',
  components: { root },
  template: '<root/>'
})
