import { prefix } from '@/config/global';

interface MenuRoute {
  path: string;
  title?: string;
  icon?: string;
  children: Array<MenuRoute>;
}

const getMenuList = (list: Array<MenuRoute>, basePath?: string): Array<any> => {
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
  data() {
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
    renderNav(list: Array<MenuRoute>, deep = 0, maxLevel = 2) {
      if (this.isSingleNav(list)) {
        return list.map((item) => (
          <t-menu-item key={item.path} value={item.path} to={item.path}>
            {item.icon && <t-icon slot="icon" name={item.icon} />}
            {item.title}
          </t-menu-item>
        ));
      }

      return list.map((item) => {
        if (deep < maxLevel) {
          if (deep === 0) {
            return (
              <t-submenu name={item.path} value={item.path}>
                {item.icon && <t-icon slot="icon" name={item.icon} />}
                {item.title && <span slot="title"> {item.title} </span>}
                {item.children && this.renderNav(item.children, deep + 1)}
              </t-submenu>
            );
          }
          return (
            <t-menu-item name={item.path} value={item.path} to={item.path}>
              {item.icon && <t-icon slot="icon" name={item.icon} />}
              {item.title}
              {item.children && this.renderNav(item.children, deep + 1)}
            </t-menu-item>
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
