import { prefix } from '@/config/global';
import { MenuRoute } from '@/interface';

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
      meta: item.meta || {},
    };
  });
};

const filterHiddenList = (routeItem: MenuRoute): boolean => !routeItem.meta || !routeItem.meta.hiddenInMenu;

const getChildrenType = (item: MenuRoute): string => {
  if (!item.children || item.children.length === 0) {
    return 'none';
  }
  if (item.children.length === 1 && !filterHiddenList(item.children[0])) {
    return 'ghost';
  }
  return 'normal';
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
    renderNav(list: Array<MenuRoute>, deep = 0, maxLevel = 2) {
      return list.filter(filterHiddenList).map((item) => {
        if (deep < maxLevel) {
          const type = getChildrenType(item);
          const path = type === 'ghost' ? item.children[0].path : item.path;
          if (deep === 0 && type === 'normal') {
            return (
              <t-submenu name={item.path} value={item.path}>
                {item.icon && <t-icon slot="icon" name={item.icon} />}
                {item.title && <span slot="title"> {item.title} </span>}
                {item.children && this.renderNav(item.children, deep + 1)}
              </t-submenu>
            );
          }
          return (
            <t-menu-item name={item.path} value={path} to={path}>
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
  render() {
    return <div>{this.renderNav(this.list)}</div>;
  },
};
