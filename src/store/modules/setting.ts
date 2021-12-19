/* eslint-disable no-param-reassign */
import STYLE_CONFIG from '@/config/style';
import MENU_CONFIG from '@/config/routes.js';
import { COLOR_TOKEN, ColorSeries, DARK_COLOR_TOKEN } from '@/config/color';

// 定义的state初始值
const state = {
  ...STYLE_CONFIG,
  showSettingPanel: false,
  colorList: COLOR_TOKEN,
};

type IInitStateType = typeof state;

interface IStateType extends IInitStateType {
  isAsideFooter: boolean;
  showSettingPanel: boolean;
}

// 定义的state的初始值方法，传入state或者额外的方法，然后利用 vuex 的双向数据驱动进行值的改变
// 可通过this.$store.commit(' ')调用，但是触发的是同步事件
const mutations = {
  update(state: IStateType, payload: IStateType) {
    state.showBreadcrumb = payload.showBreadcrumb;
    state.mode = payload.mode;
    state.layout = payload.layout;
    state.isSidebarCompact = payload.isSidebarCompact;
    state.splitMenu = payload.splitMenu;
    state.isFooterAside = payload.isFooterAside;
    state.isSidebarFixed = payload.isSidebarFixed;
    state.isHeaderFixed = payload.isHeaderFixed;
    state.showHeader = payload.showHeader;
    state.backgroundTheme = payload.backgroundTheme;
    state.brandTheme = payload.brandTheme;
  },
  toggleSidebarCompact(state: IStateType) {
    state.isSidebarCompact = !state.isSidebarCompact;
  },
  showSidebarCompact(state: IStateType, payload: boolean) {
    state.isSidebarCompact = payload;
  },

  toggleSettingPanel(state: IStateType, payload: boolean) {
    state.showSettingPanel = payload;
  },
  addColor(state: IStateType, payload: ColorSeries) {
    state.colorList = { ...state.colorList, ...payload };
  },
};

const getters = {
  showHeader: (state: IStateType) => state.showHeader,
  showSidebar: (state: IStateType) => state.layout !== 'top',
  showSidebarLogo: (state: IStateType) => state.layout === 'side',
  showHeaderLogo: (state: IStateType) => state.layout !== 'side',
  headerMenu: (state: IStateType) => {
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
  sideMenu: (state: IStateType, _, rootState) => {
    if (state.layout === 'mix' && state.splitMenu) {
      let index: number;
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
  showAsideFooter: (state: IStateType) => {
    if (state.layout === 'mix' && !state.isSidebarFixed) {
      return state.showFooter && state.isAsideFooter;
    }
    return state.showFooter;
  },

  showMainFooter: (state: IStateType) => {
    if (state.layout === 'mix' && !state.isSidebarFixed) {
      return state.showFooter && !state.isAsideFooter;
    }
    return false;
  },
  showSettingBtn: (state: IStateType) => !state.showHeader,
  mode: (state: IStateType) => {
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
  async changeTheme({ commit, dispatch }, payload: IStateType) {
    dispatch('changeMode', payload);

    dispatch('changeBrandTheme', payload);
    commit('update', payload);
  },
  async changeMode({ state, dispatch }, payload: IStateType) {
    let theme = payload.mode;
    const isDarkMode = theme === 'dark';
    if (payload.mode === 'auto') {
      const media = window.matchMedia('(prefers-color-scheme:dark)');
      if (media.matches) {
        theme = 'dark';
      } else {
        theme = 'light';
      }
    }
    if (theme !== state.mode) {
      document.documentElement.setAttribute('theme-mode', isDarkMode ? 'dark' : '');
    }
    dispatch('addColor', isDarkMode ? DARK_COLOR_TOKEN : COLOR_TOKEN);
  },
  changeBrandTheme({ state }: { state: IStateType }, payload: IStateType) {
    const { brandTheme, mode } = payload;
    if (brandTheme !== state.brandTheme) {
      document.documentElement.setAttribute(
        'theme-color',
        /^#([a-fA-F\d]{6}|[a-fA-F\d]{3})$/.test(brandTheme) && mode === 'dark' ? `${brandTheme}` : brandTheme,
      );
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
