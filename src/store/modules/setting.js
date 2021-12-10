/* eslint-disable no-param-reassign */
import STYLE_CONFIG from '@/config/style';
import MENU_CONFIG from '@/config/routes.js';
// import { replaceStyleVariables } from 'vite-plugin-theme/es/client';
// import { getGreyColor, getBrandColor, getColorList } from '@/config/color';

// 定义的state初始值
const state = {
  ...STYLE_CONFIG,
  showSettingPannel: false,
};

// 定义的state的初始值方法，传入state或者额外的方法，然后利用vuex的双向数据驱动进行值的改变
// 可通过this.$store.commit(' ')调用，但是触发的是同步事件
const mutations = {
  update(state, payload) {
    state.showBreadcrumb = payload.showBreadcrumb;
    state.mode = payload.mode;
    state.layout = payload.layout;
    state.isSidebarCompact = payload.isSidebarCompact;
    state.logoPosition = payload.logoPosition;
    state.splitMenu = payload.splitMenu;
    state.isFooterAside = payload.isFooterAside;
    state.isSidebarFixed = payload.isSidebarFixed;
    state.isHeaderFixed = payload.isHeaderFixed;
    state.showHeader = payload.showHeader;
    state.backgroundTheme = payload.backgroundTheme;
    state.brandTheme = payload.brandTheme;
  },
  toggleSidebarCompact(state) {
    state.isSidebarCompact = !state.isSidebarCompact;
  },
  showSidebarCompact(state, payload) {
    state.isSidebarCompact = payload;
  },

  toggleSettingPannel(state, payload) {
    state.showSettingPannel = payload;
  },
};

const getters = {
  showHeader: (state) => state.showHeader,
  showSidebar: (state) => state.layout !== 'top',
  showSidebarLogo: (state) => state.layout === 'side',
  showHeaderLogo: (state) => state.layout !== 'side',
  headerMenu: (state) => {
    if (state.layout === 'mix') {
      if (state.splitMenu) {
        return MENU_CONFIG.map((menu) => ({
          ...menu,
          children: [],
        }));
      }
      return [];
    }
    return MENU_CONFIG;
  },
  sideMenu: (state, getters, rootState) => {
    if (state.layout === 'mix' && state.splitMenu) {
      let index;
      for (index = 0; index < MENU_CONFIG.length; index++) {
        const item = MENU_CONFIG[index];
        if (item.children && item.children.length > 0) {
          if (rootState.route.path.indexOf(item.path) === 0) {
            return item.children.map((menuRouter) => ({ ...menuRouter, path: `${item.path}/${menuRouter.path}` }));
          }
        }
      }
    }
    return MENU_CONFIG;
  },
  showAsideFooter: (state) => {
    if (state.layout === 'mix' && !state.isSidebarFixed) {
      return state.showFooter && state.isAsideFooter;
    }
    return state.showFooter;
  },

  showMainFooter: (state) => {
    if (state.layout === 'mix' && !state.isSidebarFixed) {
      return state.showFooter && !state.isAsideFooter;
    }
    return false;
  },
  showSettingBtn: (state) => !state.showHeader,
  mode: (state) => {
    if (state.mode === 'auto') {
      const media = window.matchMedia('(prefers-color-scheme:dark)');
      if (media.matches) {
        return 'dark';
      }
      return 'light';
    }
    return state.mode;
  },
};

const actions = {
  async changeTheme({ commit, dispatch }, payload) {
    dispatch('changeMode', payload);
    dispatch('changeBrandTheme', payload);
    commit('update', payload);
  },

  changeMode({ state }, payload) {
    let theme = payload.mode;
    if (payload.mode === 'auto') {
      const media = window.matchMedia('(prefers-color-scheme:dark)');
      if (media.matches) {
        theme = 'dark';
      } else {
        theme = 'light';
      }
    }
    if (theme !== state.mode) {
      document.documentElement.setAttribute('theme-mode', theme === 'dark' ? 'dark' : '');
    }
  },
  changeBrandTheme({ state }, payload) {
    if (payload.brand !== state.brandTheme) {
      document.documentElement.setAttribute('theme-color', payload.brandTheme);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
