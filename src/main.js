import Vue from 'vue';
import './plugins/axios'
import App from './App.vue';
import router from './router';
import store from '@/store/index';
import vuetify from './plugins/vuetify';
import './core'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App, { ref: 'app' })
}).$mount('#app');
