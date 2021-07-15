import { prefix } from '@/config/global';
import proSubMenu from './sub-menu';
import tLogo from '../assets/t-logo.svg';
import tLogow from '../assets/t-logo-w.svg';
import tdLogo from '../assets/TDesign-logo.svg';
import tdLogow from '../assets/TDesign-logo-w.svg';

import '@/style/sidenav.less';
export default {
  components: {
    proSubMenu,
  },
  props: {
    menu: Array,
    showLogo: {
      type: Boolean,
      default: true,
    },
    isFixed: {
      type: Boolean,
      default: true,
    },
    layout: String,
    headerHeight: {
      type: String,
      default: '64px',
    },
    theme: {
      type: String,
      default: 'light',
    },
    isCompact: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      prefix,
    };
  },
  computed: {
    iconName(): string {
      return this.$store.state.setting.isSidebarCompact ? 'menu-fold' : 'menu-unfold';
    },
    collapsed(): boolean {
      return this.$store.state.setting.isSidebarCompact;
    },
    sidenavCls(): Array<ClassName> {
      return [
        `${this.prefix}-sidebar-layout`,
        {
          [`${this.prefix}-sidebar-compact`]: this.isCompact,
        },
      ];
    },
    menuCls(): Array<ClassName> {
      return [
        `${this.prefix}-sidenav`,
        {
          [`${this.prefix}-sidenav-no-logo`]: !this.showLogo,
          [`${this.prefix}-sidenav-no-fixed`]: !this.isFixed,
          [`${this.prefix}-sidenav-mix-fixed`]: this.layout === 'mix' && this.isFixed,
        },
      ];
    },
    layoutCls(): Array<ClassName> {
      return [`${this.prefix}-sidenav-${this.layout}`, `${this.prefix}-sidebar-layout`];
    },
    tLogo(): string {
      return this.theme === 'dark' ? tLogow : tLogo;
    },
    tdLogo(): string {
      return this.theme === 'dark' ? tdLogow : tdLogo;
    },
  },
  methods: {
    changeCollapsed(): void {
      this.$store.commit('setting/toggleSidebarCompact');
    },

    getActiveName(maxLevel = 2): string {
      if (!this.$route.path) {
        return '';
      }
      return this.$route.path
        .split('/')
        .filter((_item: string, index: number) => index <= maxLevel && index > 0)
        .map((item: string) => `/${item}`)
        .join('');
    },
  },
  render() {
    const active = this.getActiveName();

    return (
      <div class={this.sidenavCls}>
        <t-menu width="232px" class={this.menuCls} theme={this.theme} value={active} collapsed={this.collapsed}>
          {this.showLogo && (
            <span slot="logo" class={`${this.prefix}-sidenav-logo-wrapper`}>
              <img class={`${this.prefix}-sidenav-logo-t-logo`} src={this.tLogo} />
              {!this.collapsed && <img class={`${this.prefix}-sidenav-logo-tdesign-logo`} src={this.tdLogo} />}
            </span>
          )}
          <pro-sub-menu navData={this.menu}></pro-sub-menu>
          <div slot="options" onClick={this.changeCollapsed}>
            <t-icon name={this.iconName} />
          </div>
        </t-menu>
        <div class={`${this.prefix}-sidenav-placeholder${this.collapsed ? '-hidden' : ''}`}></div>
      </div>
    );
  },
};
