import menuRoutes from '@/config/routes.js';
import { prefix } from '@/config/global';
import '@/style/sidenav.less';
import proSubMenu from './sub-menu';

export default {
  components: {
    proSubMenu,
  },
  props: {
    navData: [],
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
      <div>
        <t-menu width="232px" class={`${this.prefix}-sidenav`} theme="light" active={active} collapsed={this.collapsed}>
          <span slot="logo" class={`${this.prefix}-sidenav-logo-wrapper`}>
            <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/pro-template/logo-blue.png" />
            {!this.collapsed && <span class={`${this.prefix}-sidenav-logo-normal`}> TDesign pro</span>}
          </span>
          <pro-sub-menu navData={menuRoutes}></pro-sub-menu>
          <div slot="options" onClick={this.changeCollapsed}>
            <t-icon name={this.iconName} />
          </div>
        </t-menu>
        <div class={`${this.prefix}-sidenav-placeholder${this.collapsed ? '-hidden' : ''}`}></div>
      </div>
    );
  },
};
