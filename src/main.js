import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/css/index.scss'

//Relativo ao Bootstrap Vue 4
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons)

//Relativos ao VeeValidate, validador de forms
import VeeValidate from 'vee-validate';
import msg from './pt_BR'; //tradução pra portugues
Vue.use(VeeValidate, {

  fieldsBagName: 'formFields',
  locale: 'pt_BR',
  dictionary: {
    pt_BR: {
      messages: msg
    }
  },
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')

store.dispatch('login/verificaToken')
