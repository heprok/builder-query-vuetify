import Vue from 'vue';
import Dev from './serve.vue';
import i18n from '@/i18n.js'
import vuetify from '@/plugins/vuetify'
import 'vuetify/dist/vuetify.min.css'
Vue.config.productionTip = false;
console.log(i18n);
new Vue({
  i18n,
  vuetify,
  render: (h) => h(Dev),
}).$mount('#app');
