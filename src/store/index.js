import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import setting from './modules/setting';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
    setting,
  },
});

export default store;
