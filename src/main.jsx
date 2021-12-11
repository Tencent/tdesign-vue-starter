import Vue from 'vue';
import VueRouter from 'vue-router';
import { sync } from 'vuex-router-sync';
import TDesign from 'tdesign-vue/esm';
import VueClipboard from 'vue-clipboard2';
import axiosInstance from '@/utils/request';
import App from './App.vue';
import router from './router';

import '@/style/index.less';

import './permisson';
import store from './store';

Vue.use(VueRouter);
Vue.use(TDesign);
Vue.use(VueClipboard);

Vue.component('t-page-header');

Vue.prototype.$request = axiosInstance;

Vue.config.productionTip = false;
sync(store, router);
new Vue({
  router,
  store,
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: (h) => (
    <div>
      <App />
    </div>
  ),
}).$mount('#app');
