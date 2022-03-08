import { prefix } from '@/config/global';
import { MenuRoute } from '@/interface';

const getMenuList = (list: MenuRoute[], basePath?: string): MenuRoute[] => {
  if (!list) {
    return [];
  }
  return list
    .map((item) => {
      const path = basePath ? `${basePath}/${item.path}` : item.path;
      return {
        path,
        title: item.meta?.title,
        icon: item.meta?.icon || '',
        children: getMenuList(item.children, path),
        meta: item.meta,
        redirect: item.redirect,
      };
    })
    .filter((item) => item.meta && item.meta.hidden !== true);
};

export default {
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
    renderIcon(item) {
      if (typeof item.icon === 'string') {
        return () => item.icon && <t-icon name={item.icon}></t-icon>;
      }
      if (item.icon && typeof item.icon.render === 'function') {
        return () =>
          this.$createElement(item.icon, {
            class: 't-icon',
          });
      }
      return () => '';
    },
    renderNav(list: Array<MenuRoute>) {
      return list.map((item) => {
        if (!item.children || !item.children.length || item.meta?.single) {
          const href = item.path.match(/(http|https):\/\/([\w.]+\/?)\S*/);
          if (href) {
            return (
              <t-menu-item
                href={href?.[0]}
                name={item.path}
                value={item.meta?.single ? item.redirect : item.path}
                icon={this.renderIcon(item)}
              >
                {item.title}
              </t-menu-item>
            );
          }
          return (
            <t-menu-item
              name={item.path}
              value={item.meta?.single ? item.redirect : item.path}
              to={item.path}
              icon={this.renderIcon(item)}
            >
              {item.title}
            </t-menu-item>
          );
        }
        return (
          <t-submenu name={item.path} value={item.path} title={item.title} icon={this.renderIcon(item)}>
            {item.children && this.renderNav(item.children)}
          </t-submenu>
        );
      });
    },
  },
  render() {
    return <div>{this.renderNav(this.list)}</div>;
  },
};
