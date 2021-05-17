import { prefix } from '@/config/global';
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
  name: 'proSubMenu',
  props: {
    navData: Array,
  },
  data(): any {
    return {
      prefix,
    };
  },
  computed: {
    list(): Array<MenuRoute> {
      return getMenuList(this.navData);
    },
  },
  methods: {
    isSingleNav(list: Array<MenuRoute>): boolean {
      return list.every((item) => !item.children || item.children.length === 0);
    },
    renderNav(list: Array<MenuRoute>, deep = 0, maxLevel = 2): any {
      if (this.isSingleNav(list)) {
        return list.map((item) => (
          <router-link to={item.path}>
            <t-menu-item name={item.path}>
              {item.icon && <t-icon slot="icon" name={item.icon} />}
              {item.title}
            </t-menu-item>
          </router-link>
        ));
      }

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

    return <div>{navs}</div>;
  },
};
