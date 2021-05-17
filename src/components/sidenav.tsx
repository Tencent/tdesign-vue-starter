import { prefix } from '@/config/global';
import '@/style/sidenav.less';
import proSubMenu from './sub-menu';
import { className } from 'typescript';

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
  },
  data(): any {
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
    theme(): string {
      return this.$store.state.setting.theme;
    },
    menuCls(): Array<className | { [className: string]: any }> {
      return [
        `${this.prefix}-sidenav`,
        {
          [`${this.prefix}-sidenav-no-logo`]: !this.showLogo,
          [`${this.prefix}-sidenav-no-fixed`]: !this.isFixed,
          [`${this.prefix}-sidenav-mix-fixed`]: this.layout === 'mix' && this.isFixed,
        },
      ];
    },
    layoutCls(): Array<className | { [className: string]: any }> {
      return [`${this.prefix}-sidenav-${this.layout}`, `${this.prefix}-sidebar-layout`];
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
        .filter((item, index) => index <= maxLevel && index > 0)
        .map((item) => `/${item}`)
        .join('');
    },
  },
  render(): any {
    const active = this.getActiveName();

    return (
      <div class={`${this.prefix}-sidebar-layout`}>
        <t-menu width="232px" class={this.menuCls} theme="light" active={active} collapsed={this.collapsed}>
          {this.showLogo && (
            <span slot="logo" class={`${this.prefix}-sidenav-logo-wrapper`}>
              <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/pro-template/logo-blue.png" />
              {!this.collapsed && <span class={`${this.prefix}-sidenav-logo-normal`}> TDesign pro</span>}
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
