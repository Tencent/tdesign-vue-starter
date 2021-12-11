import Vue, { VNode } from 'vue';
import { mapGetters } from 'vuex';
import TdesignHeader from './header/index.vue';
import TdesignBreadcrumb from './components/Breadcrumb.vue';
import TdesignFooter from './components/Footer.vue';
import TdesignSideNav from './components/SideNav';

import { prefix } from '@/config/global';
import TdesignSetting from './setting.vue';
import { ModeType, SettingType, ClassName } from '@/interface';
import '@/style/layout.less';

const name = `${prefix}-base-layout`;

export default Vue.extend({
  name,
  components: {
    TdesignHeader,
    TdesignFooter,
    TdesignSideNav,
    TdesignSetting,
    TdesignBreadcrumb,
  },
  data(): any {
    return {
      prefix,
      headerHeight: '64px',
    };
  },
  computed: {
    ...mapGetters({
      showSidebar: 'setting/showSidebar',
      showHeader: 'setting/showHeader',
      showHeaderLogo: 'setting/showHeaderLogo',
      showSidebarLogo: 'setting/showSidebarLogo',
      headerMenu: 'setting/headerMenu',
      sideMenu: 'setting/sideMenu',
      showAsideFooter: 'setting/showAsideFooter',
      showMainFooter: 'setting/showMainFooter',
      mode: 'setting/mode',
    }),
    setting(): SettingType {
      return this.$store.state.setting;
    },
    mainLayoutCls(): Array<ClassName> {
      return [
        {
          't-layout-has-sider': this.showSidebar,
        },
      ];
    },
  },
  methods: {
    getNavTheme(mode: ModeType, layout: string, type: string): string {
      if (mode === 'dark') {
        return 'dark';
      }
      if (type.includes(layout)) {
        return 'dark';
      }
      return this.mode;
    },
    renderSidebar(): VNode {
      const theme = this.getNavTheme(this.setting.mode, this.setting.layout, ['side']);
      // const theme =
      //   this.setting.mode === 'dark' ? 'dark' : this.setting.layout === 'mix' ? 'light' : this.setting.theme;
      // menu 组件最多支持 3级菜单
      const maxLevel = this.setting.splitMenu ? 2 : 3;

      return (
        this.showSidebar && (
          <tdesign-side-nav
            showLogo={this.showSidebarLogo}
            layout={this.setting.layout}
            isFixed={this.setting.isSidebarFixed}
            menu={this.sideMenu}
            theme={theme}
            isCompact={this.setting.isSidebarCompact}
            maxLevel={maxLevel}
          />
        )
      );
    },
    renderHeader(): VNode {
      const theme = this.getNavTheme(this.setting.mode, this.setting.layout, ['mix', 'top']);

      // const theme = this.setting.layout === 'side' ? 'light' : this.setting.theme;
      const maxLevel = this.setting.splitMenu ? 1 : 3;
      return (
        this.showHeader && (
          <tdesign-header
            showLogo={this.showHeaderLogo}
            maxLevel={maxLevel}
            theme={theme}
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
      const { prefix, showAsideFooter } = this;
      return (
        <t-layout>
          <t-content class={`${prefix}-content-layout`}>
            {showBreadcrumb && <tdesign-breadcrumb />}
            <router-view class={`${prefix}-default-layout`} />
          </t-content>
          {showAsideFooter && this.renderFooter()}
        </t-layout>
      );
    },

    renderFooter(prefix = 'tdesign'): VNode {
      return (
        <t-footer class={`${prefix}-footer-layout`}>
          <tdesign-footer />
        </t-footer>
      );
    },
  },

  render(): VNode {
    const { layout } = this.setting;
    const header = this.renderHeader();
    const sidebar = this.renderSidebar();
    const content = this.renderContent();
    const footer = this.renderFooter();

    return (
      <div class={`${prefix}-wrapper`}>
        {layout === 'side' ? (
          <t-layout class={this.mainLayoutCls} key="side">
            <t-aside>{sidebar}</t-aside>
            <t-layout>{[header, content]}</t-layout>
          </t-layout>
        ) : (
          <t-layout key="no-side">
            {header}
            <t-layout class={this.mainLayoutCls}>{[sidebar, content]}</t-layout>
            {this.showMainFooter && footer}
          </t-layout>
        )}
        <tdesign-setting />
      </div>
    );
  },
});
