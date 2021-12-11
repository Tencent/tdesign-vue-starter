import Vue from 'vue';
import { prefix } from '@/config/global';

import SubMenu from './SubMenu';
import pgk from '../../../package.json';
import tLogo from '@/assets/assets-t-logo.svg';
import tLogoFull from '@/assets/assets-logo-full.svg';

const MIN_POINT = 992 - 1;

export default Vue.extend({
  name: 'sideNav',
  components: {
    SubMenu,
    tLogo,
    tLogoFull,
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
    sideNavCls(): Array<ClassName> {
      return [
        `${this.prefix}-sidebar-layout`,
        {
          [`${this.prefix}-sidebar-compact`]: this.isCompact,
        },
      ];
    },
    menuCls(): Array<ClassName> {
      return [
        `${this.prefix}-side-nav`,
        {
          [`${this.prefix}-side-nav-no-logo`]: !this.showLogo,
          [`${this.prefix}-side-nav-no-fixed`]: !this.isFixed,
          [`${this.prefix}-side-nav-mix-fixed`]: this.layout === 'mix' && this.isFixed,
        },
      ];
    },
    layoutCls(): Array<ClassName> {
      return [`${this.prefix}-side-nav-${this.layout}`, `${this.prefix}-sidebar-layout`];
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
      <div class={this.sideNavCls}>
        <t-menu width="232px" class={this.menuCls} theme={this.theme} value={this.active} collapsed={this.collapsed}>
          {this.showLogo && (
            <span slot="logo" class={`${prefix}-side-nav-logo-wrapper`}>
              {this.collapsed ? (
                <tLogo class={`${prefix}-side-nav-logo-t-logo`} />
              ) : (
                <t-logo-full class={`${prefix}-side-nav-logo-tdesign-logo`} />
              )}
            </span>
          )}
          <sub-menu navData={this.menu}></sub-menu>
          <span slot="operations" class="version-container" onClick={this.changeCollapsed}>
            {!this.collapsed && 'TDesign Starter'} {pgk.version}
          </span>
        </t-menu>
        <div class={`${prefix}-side-nav-placeholder${this.collapsed ? '-hidden' : ''}`}></div>
      </div>
    );
  },
});
