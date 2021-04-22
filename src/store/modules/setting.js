import STYLE_CONFIG from '@/config/style';

// 定义的state初始值
const state = {
  ...STYLE_CONFIG,
};

// 定义的state的初始值方法，传入state或者额外的方法，然后利用vuex的双向数据驱动进行值的改变
// 可通过this.$store.commit(' ')调用，但是触发的是同步事件
const mutations = {
  update(state, payload) {
    // eslint-disable-next-line no-param-reassign
    state.showHeader = payload.showHeader;
    state.showFooter = payload.showFooter;
    state.showSidebar = payload.showSidebar;
    state.showBreadcrumb = payload.showBreadcrumb;
    state.theme = payload.theme;
    state.layout = payload.layout;
    state.isSidebarCompact = payload.isSidebarCompact;
  },
  toggleSidebarCompact(state) {
    state.isSidebarCompact = !state.isSidebarCompact;
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
