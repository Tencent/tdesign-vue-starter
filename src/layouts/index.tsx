import Vue, { VNode } from 'vue';
import { mapGetters } from 'vuex';
import { RefreshIcon, ArrowLeftIcon, ArrowRightIcon, HomeIcon, CloseCircleIcon } from 'tdesign-icons-vue';
import LayoutHeader from './components/Header.vue';
import LayoutBreadcrumb from './components/Breadcrumb.vue';
import LayoutFooter from './components/Footer.vue';
import LayoutSideNav from './components/SideNav';
import LayoutContent from './components/Content.vue';
import Setting from './setting.vue';

import { prefix } from '@/config/global';
import { SettingType } from '@/interface';

import '@/style/layout.less';

const name = `${prefix}-base-layout`;

export default Vue.extend({
  name,
  components: {
    LayoutHeader,
    LayoutContent,
    LayoutFooter,
    LayoutSideNav,
    LayoutBreadcrumb,
    Setting,
    RefreshIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    HomeIcon,
    CloseCircleIcon,
  },
  computed: {
    ...mapGetters({
      showSidebar: 'setting/showSidebar',
      showHeader: 'setting/showHeader',
      showHeaderLogo: 'setting/showHeaderLogo',
      showSidebarLogo: 'setting/showSidebarLogo',
      showFooter: 'setting/showFooter',
      mode: 'setting/mode',
      isUseTabsRouter: 'setting/isUseTabsRouter',
      menuRouters: 'permission/routers',
      tabRouterList: 'tabRouter/tabRouterList',
    }),
    setting(): SettingType {
      return this.$store.state.setting;
    },
    headerMenu() {
      const { layout, splitMenu } = this.$store.state.setting;
      const { menuRouters } = this;
      if (layout === 'mix') {
        if (splitMenu) {
          return menuRouters.map((menu) => ({
            ...menu,
            children: [],
          }));
        }
        return [];
      }
      return menuRouters;
    },
    sideMenu() {
      const { layout, splitMenu } = this.$store.state.setting;
      let { menuRouters } = this;
      if (layout === 'mix' && splitMenu) {
        menuRouters.forEach((menu) => {
          if (this.$route.path.indexOf(menu.path) === 0) {
            menuRouters = menu.children.map((subMenu) => ({ ...subMenu, path: `${menu.path}/${subMenu.path}` }));
          }
        });
      }
      return menuRouters;
    },
  },
  watch: {
    $route(newRoute) {
      // 监听路由变化往多标签新增
      const {
        path,
        meta: { title },
        name,
      } = newRoute;
      this.$store.commit('tabRouter/appendTabRouterList', { path, title, name, isAlive: true });
    },
  },
  // 如果不需要持久化标签页可以注释掉created和destroyed的内容
  created() {
    window.addEventListener('beforeunload', this.setTabRouterListCache);
  },
  destroyed() {
    window.removeEventListener('beforeunload', this.setTabRouterListCache);
  },
  mounted() {
    const {
      path,
      meta: { title },
      name,
    } = this.$route;

    if (localStorage.getItem('tabRouterList')) this.getTabRouterListCache();
    this.$store.commit('tabRouter/appendTabRouterList', { path, title, name, isAlive: true });
  },
  methods: {
    handleRemove(path: string, routeIdx: number) {
      const nextRouter = this.tabRouterList[routeIdx + 1] || this.tabRouterList[routeIdx - 1];

      this.$store.commit('tabRouter/subtractCurrentTabRouter', { path, routeIdx });
      if (path === this.$router.history?.current?.path) {
        this.$router.push(nextRouter.path);
      }
    },
    handleChangeCurrentTab(path: string) {
      this.$router.push(path);
    },
    handleRefresh(currentPath: string, routeIdx: number) {
      this.$store.commit('tabRouter/toggleTabRouterAlive', routeIdx);
      this.$nextTick(() => {
        this.$store.commit('tabRouter/toggleTabRouterAlive', routeIdx);
        this.$router.replace({ path: currentPath });
      });
    },
    handleCloseAhead(path: string, routeIdx: number) {
      this.$store.commit('tabRouter/subtractTabRouterAhead', { path, routeIdx });
    },
    handleCloseBehind(path: string, routeIdx: number) {
      this.$store.commit('tabRouter/subtractTabRouterBehind', { path, routeIdx });
    },
    handleCloseOther(path: string, routeIdx: number) {
      this.$store.commit('tabRouter/subtractTabRouterOther', { path, routeIdx });
    },
    getTabRouterListCache() {
      this.$store.commit('tabRouter/initTabRouterList', JSON.parse(localStorage.getItem('tabRouterList')));
    },
    setTabRouterListCache() {
      localStorage.setItem('tabRouterList', JSON.stringify(this.tabRouterList));
    },
    renderSidebar(): VNode {
      // const theme =
      //   this.setting.mode === 'dark' ? 'dark' : this.setting.layout === 'mix' ? 'light' : this.setting.theme;
      // menu 组件最多支持 3级菜单
      const maxLevel = this.setting.splitMenu ? 2 : 3;

      return (
        this.showSidebar && (
          <layout-side-nav
            showLogo={this.showSidebarLogo}
            layout={this.setting.layout}
            isFixed={this.setting.isSidebarFixed}
            menu={this.sideMenu}
            theme={this.mode}
            isCompact={this.setting.isSidebarCompact}
            maxLevel={maxLevel}
          />
        )
      );
    },
    renderHeader(): VNode {
      const maxLevel = this.setting.splitMenu ? 1 : 3;
      return (
        this.showHeader && (
          <layout-header
            showLogo={this.showHeaderLogo}
            maxLevel={maxLevel}
            theme={this.mode}
            layout={this.setting.layout}
            isFixed={this.setting.isHeaderFixed}
            menu={this.headerMenu}
            isCompact={this.setting.isSidebarCompact}
          />
        )
      );
    },
    renderContent(): VNode {
      const { showBreadcrumb } = this.setting;
      const { showFooter } = this;
      return (
        <t-layout class={[`${prefix}-layout`]}>
          {this.isUseTabsRouter && (
            <t-tabs
              theme="card"
              class={`${prefix}-layout-tabs-nav`}
              value={this.$route.path}
              onChange={this.handleChangeCurrentTab}
              style={{ position: 'sticky', top: 0, width: '100%' }}
            >
              {this.tabRouterList.map((route: { path: string; title: string; isHome: boolean }, idx: number) => (
                <t-tab-panel
                  value={route.path}
                  key={`${route.path}_${idx}`}
                  label={() => (
                    <t-dropdown
                      trigger="context-menu"
                      minColumnWidth={128}
                      popupProps={{ overlayClassName: 'route-tabs-dropdown' }}
                    >
                      {!route.isHome ? route.title : <home-icon />}
                      {this.$route.path === route.path && (
                        <t-dropdown-menu slot="dropdown">
                          <t-dropdown-item onClick={() => this.handleRefresh(route.path, idx)}>
                            <refresh-icon />
                            刷新
                          </t-dropdown-item>
                          {idx > 0 && (
                            <t-dropdown-item onClick={() => this.handleCloseAhead(route.path, idx)}>
                              <arrow-left-icon />
                              关闭左侧
                            </t-dropdown-item>
                          )}
                          {idx < this.tabRouterList.length - 1 && (
                            <t-dropdown-item onClick={() => this.handleCloseBehind(route.path, idx)}>
                              <arrow-right-icon />
                              关闭右侧
                            </t-dropdown-item>
                          )}
                          <t-dropdown-item onClick={() => this.handleCloseOther(route.path, idx)}>
                            <close-circle-icon />
                            关闭其它
                          </t-dropdown-item>
                        </t-dropdown-menu>
                      )}
                    </t-dropdown>
                  )}
                  removable={!route.isHome}
                  onRemove={() => this.handleRemove(route.path, idx)}
                ></t-tab-panel>
              ))}
            </t-tabs>
          )}
          <t-content class={`${prefix}-content-layout`}>
            {showBreadcrumb && <layout-breadcrumb />}
            <layout-content />
          </t-content>
          {showFooter && this.renderFooter()}
        </t-layout>
      );
    },

    renderFooter(): VNode {
      return (
        <t-footer class={`${prefix}-footer-layout`}>
          <layout-footer />
        </t-footer>
      );
    },
  },

  render(): VNode {
    const { layout } = this.setting;
    const header = this.renderHeader();
    const sidebar = this.renderSidebar();
    const content = this.renderContent();
    let renderLayout: VNode;
    if (layout === 'side') {
      renderLayout = (
        <t-layout key="side">
          <t-aside>{sidebar}</t-aside>
          <t-layout>
            <t-header>{header}</t-header>
            <t-content>{content}</t-content>
          </t-layout>
        </t-layout>
      );
    } else if (layout === 'top') {
      renderLayout = (
        <t-layout key="top">
          <t-header> {header}</t-header>
          <t-content>{content}</t-content>
        </t-layout>
      );
    } else {
      renderLayout = (
        <t-layout key="mix">
          <t-header>{header}</t-header>
          <t-layout>
            <t-aside>{sidebar}</t-aside>
            <t-content>{content}</t-content>
          </t-layout>
        </t-layout>
      );
    }

    return (
      <div>
        {renderLayout}
        <setting />
      </div>
    );
  },
});
