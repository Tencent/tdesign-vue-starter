import menuRoutes from "@/config/routes.js";

const getMenuList = (list, basePath) => {
  if (!list) {
    return []
  }
  return list.map((item) => {
     const path =  basePath ? `${basePath}/${item.path}`:  item.path; 
     return {
       path: path,
       title: item.title,
       icon: item.icon || '',
       children: getMenuList(item.children, path)
     }
  });
};
export default {
  props: {
    theme: "light",
    navData: [],
  },
  data() {
    return {
      collapsed: true,
      list: getMenuList(menuRoutes),
    };
  },
  computed: {
    iconName() {
      return this.collapsed ? "menu-fold" : "menu-unfold";
    },
  },
  methods: {
    changeCollapsed() {
      this.collapsed = !this.collapsed;
    },

    getActiveName(maxLevel = 2) {
      if (!this.$route.path) {
        return '';
      }
      return this.$route.path.split('/')
              .filter( (item, index) =>  (index <= maxLevel && index > 0) )
              .map(item => `/${item}`)
              .join('');
    },

    goLink(path) {
      this.$router.push(path).catch(err => {
        console.log(err);
      });
    },

    renderNav(list, deep = 0, maxLevel = 2) {
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
      });
    },
  },
  render(h) {
    const navs = this.renderNav(this.list);
    const active = this.getActiveName();

    return (
      <t-menu
        className="tdesign-sidenav"
        theme={this.theme}
        active={active}
        collapsed={this.collapsed}
      >
        <span slot="logo">TDesign pro</span>
        {navs}
        <div slot="options" onClick={this.changeCollapsed }>
          <t-icon name={this.iconName} />
        </div>
      </t-menu>
    );
  },
};
