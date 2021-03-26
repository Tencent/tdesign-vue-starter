import menuRoutes from '@/config/routes.js';
import { prefix } from '@/config/global';
import '@/style/sidenav.less';
interface MenuRoute {
  path: string;
  title?: string;
  icon?: string;
  children: Array<MenuRoute>;
}

const getMenuList = (list: Array<MenuRoute>, basePath?: string) => {
  if (!list) {
    return [];
  }
  return list.map((item) => {
    const path = basePath ? `${basePath}/${item.path}` : item.path;
    return {
      path,
      title: item.title,
      icon: item.icon || '',
      children: getMenuList(item.children, path),
    };
  });
};
export default {
  props: {
    theme: String,
    navData: [],
  },
  data(): any {
    return {
      prefix,
      collapsed: false,
      list: getMenuList(menuRoutes),
    };
  },
  computed: {
    iconName(): string {
      return this.collapsed ? 'menu-fold' : 'menu-unfold';
    },
  },
  methods: {
    changeCollapsed(): void {
      this.collapsed = !this.collapsed;
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

    renderNav(list: Array<MenuRoute>, deep = 0, maxLevel = 2): any {
      return list.map((item) => {
        if (deep < maxLevel) {
          if (deep === 0) {
            return (
              <t-submenu name={item.path}>
                {item.icon && <t-icon slot="icon" name={item.icon} />}
                {item.title && <span slot="title"> {item.title} </span>}
                {item.children && this.renderNav(item.children, deep + 1)}
              </t-submenu>
            );
          }
          return (
            <router-link to={item.path}>
              <t-menu-item name={item.path}>
                {item.icon && <t-icon slot="icon" name={item.icon} />}
                {item.title}
                {item.children && this.renderNav(item.children, deep + 1)}
              </t-menu-item>
            </router-link>
          );
        }
        return '';
      });
    },
  },
  render(): any {
    const navs = this.renderNav(this.list);
    const active = this.getActiveName();

    return (
      <t-menu
        width="232px"
        className={`${this.prefix}-sidenav`}
        theme={this.theme}
        active={active}
        collapsed={this.collapsed}
      >
        <span slot="logo">TDesign pro</span>
        {navs}
        <div slot="options" onClick={this.changeCollapsed}>
          <t-icon name={this.iconName} />
        </div>
      </t-menu>
    );
  },
};
