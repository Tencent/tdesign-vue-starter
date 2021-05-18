import { VNode } from 'vue';

import TdesignHeader from '@/components/header.vue';
import TdesignBreadcrumb from '@/components/breadcrumb.vue';
import TdesignFooter from '@/components/footer.vue';
import TdesignSidenav from '@/components/sidenav';
import { prefix } from '@/config/global';
import TdesignSetting from '@/components/setting.vue';
import { mapGetters } from 'vuex';
import { className } from 'typescript';

import '@/style/index.less';

const name = `${prefix}-base-layout`;
export default {
  name,
  components: {
    TdesignHeader,
    TdesignFooter,
    TdesignSidenav,
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
    }),
    setting(): any {
      return this.$store.state.setting;
    },
    // fixed t-aside 无法被父元素实时监听的 bug
    mainLayoutCls(): Array<className | { [className: string]: any }> {
      return [
        {
          't-layout-has-sider': this.showSidebar,
        },
      ];
    },
  },
  methods: {
    renderSidebar(): VNode {
      return (
        this.showSidebar && (
          <tdesign-sidenav
            showLogo={this.showSidebarLogo}
            layout={this.setting.layout}
            isFixed={this.setting.isSidebarFixed}
            menu={this.sideMenu}
            isCompact={this.setting.isSidebarCompact}
          />
        )
      );
    },
    renderHeader(): VNode {
      return (
        this.showHeader && (
          <tdesign-header
            showLogo={this.showHeaderLogo}
            theme={this.setting.theme}
            layout={this.setting.layout}
            isFixed={this.setting.isHeaderFixed}
            menu={this.headerMenu}
            isCompact={this.setting.isSidebarCompact}
          />
        )
      );
    },
    renderContent(): VNode {
      const { showBreadCrumb } = this.setting;
      const { prefix, showAsideFooter } = this;
      return (
        <t-layout>
          <t-content class={`${prefix}-content-layout`}>
            {showBreadCrumb && <tdesign-breadcrumb />}
            <router-view class={`${prefix}-default-layout`} />
          </t-content>
          {showAsideFooter && this.renderFooter(h)}
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
          <t-layout class={this.mainLayoutCls}>
            <t-aside>{sidebar}</t-aside>
            <t-layout>{[header, content]}</t-layout>
          </t-layout>
        ) : (
          <t-layout>
            {header}
            <t-layout class={this.mainLayoutCls}>{[sidebar, content]}</t-layout>
            {this.showMainFooter && footer}
          </t-layout>
        )}
        <tdesign-setting />
      </div>
    );
  },
};
