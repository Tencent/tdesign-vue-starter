export type TRouterInfo = {
  path: string;
  routeIdx: number;
  title: string;
  name?: string;
  isAlive?: boolean;
  isHome?: boolean;
};

export type TTabRouterType = {
  isRefreshing: boolean;
  tabRouterList: Array<TRouterInfo>;
};

const state: TTabRouterType = {
  tabRouterList: [{ path: '/dashboard/base', routeIdx: 0, name: 'DashboardBase', title: '仪表盘', isHome: true }],
  isRefreshing: false,
};

const mutations = {
  toggleTabRouterAlive(state: TTabRouterType, routeIdx: number) {
    state.isRefreshing = !state.isRefreshing;
    state.tabRouterList[routeIdx].isAlive = !state.tabRouterList[routeIdx].isAlive;
  },
  appendTabRouterList(state: TTabRouterType, newRoute: TRouterInfo) {
    if (!state.tabRouterList.find((route: TRouterInfo) => route.path === newRoute.path))
      // eslint-disable-next-line no-param-reassign
      state.tabRouterList = state.tabRouterList.concat(newRoute);
  },
  subtractCurrentTabRouter(state: TTabRouterType, newRoute: TRouterInfo) {
    const { routeIdx } = newRoute;
    state.tabRouterList = state.tabRouterList.slice(0, routeIdx).concat(state.tabRouterList.slice(routeIdx + 1));
  },
  subtractTabRouterBehind(state: TTabRouterType, newRoute: TRouterInfo) {
    const { routeIdx } = newRoute;
    state.tabRouterList = state.tabRouterList.slice(0, routeIdx + 1);
  },
  subtractTabRouterAhead(state: TTabRouterType, newRoute: TRouterInfo) {
    const { routeIdx } = newRoute;
    state.tabRouterList = state.tabRouterList.slice(routeIdx);
  },
  subtractTabRouterOther(state: TTabRouterType, newRoute: TRouterInfo) {
    const { routeIdx } = newRoute;
    state.tabRouterList = [state.tabRouterList?.[routeIdx]];
  },
  removeTabRouterList() {
    state.tabRouterList = [];
  },
  initTabRouterList(state: TTabRouterType, newRoute: TRouterInfo[]) {
    state.tabRouterList = newRoute;
  },
};

const getters = {
  tabRouterList: (state: TTabRouterType) => state.tabRouterList,
  isRefreshing: (state: TTabRouterType) => state.isRefreshing,
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
