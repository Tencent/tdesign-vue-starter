import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import setting from './modules/setting';
import notification from './modules/notification';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: import.meta.env !== 'production',
  modules: {
    user,
    setting,
    notification,
  },
});

export default store;
