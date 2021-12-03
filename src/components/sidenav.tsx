import { prefix } from '@/config/global';
import proSubMenu from './sub-menu';
import tLogo from '../assets/assets-t-logo.svg';
// import tLogow from '../assets/t-logo-w.svg';
import tdLogoBlack from '../assets/assets-tdesign-logo-black.svg';
import tdLogoWhite from '../assets/assets-tdesign-logo-white.svg';

import '@/style/sidenav.less';

const MIN_POINT = 992 - 1;

export default {
  name: 'sidenav',
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
    maxLevel: {
      type: Number,
      default: 3,
    },
  },
  data() {
    return {
      prefix,
    };
  },
  mounted() {
    this.autoCollapsed();

    window.onresize = () => {
      this.autoCollapsed();
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
      // return this.theme === 'dark' ? tLogow : tLogo;
      return tLogo;
    },
    tdLogo(): string {
      return this.theme === 'dark' ? tdLogoWhite : tdLogoBlack;
    },
    active(): string {
      if (!this.$route.path) {
        return '';
      }
      return this.$route.path
        .split('/')
        .filter((_item: string, index: number) => index <= this.maxLevel && index > 0)
        .map((item: string) => `/${item}`)
        .join('');
    },
  },
  methods: {
    changeCollapsed(): void {
      this.$store.commit('setting/toggleSidebarCompact');
    },
    autoCollapsed(): void {
      const isCompact = window.innerWidth <= MIN_POINT;
      this.$store.commit('setting/showSidebarCompact', isCompact);
    },
  },
  render() {
    return (
      <div class={this.sidenavCls}>
        <t-menu width="232px" class={this.menuCls} theme={this.theme} value={this.active} collapsed={this.collapsed}>
          {this.showLogo && (
            <span slot="logo" class={`${this.prefix}-sidenav-logo-wrapper`}>
              <tLogo class={`${this.prefix}-sidenav-logo-t-logo`} />
              {!this.collapsed &&
                (this.theme === 'dark' ? (
                  <tdLogoWhite class={`${this.prefix}-sidenav-logo-tdesign-logo`} />
                ) : (
                  <tdLogoBlack class={`${this.prefix}-sidenav-logo-tdesign-logo`} />
                ))}
            </span>
          )}
          <pro-sub-menu navData={this.menu}></pro-sub-menu>
          <div slot="operations" onClick={this.changeCollapsed}>
            <t-icon name={this.iconName} />
          </div>
        </t-menu>
        <div class={`${this.prefix}-sidenav-placeholder${this.collapsed ? '-hidden' : ''}`}></div>
      </div>
    );
  },
};
