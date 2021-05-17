import routeConfig from '@/config/routes.js';
import VueRouter from 'vue-router';

const layoutModules = import.meta.glob('../layouts/*');
const pagesModules = import.meta.glob('../pages/**/*.vue');
const fristPagesModules = import.meta.glob('../pages/*.vue');

const modules = Object.assign({}, layoutModules, fristPagesModules, pagesModules);
const getMenuRoutes = (list) => {
  if (!list) {
    return [];
  }
  return list.map((item) => {
    const { path = '', component, meta = { title: item.title } } = item;
    return {
      path,
      component: modules[component],
      children: getMenuRoutes(item.children),
      meta,
    };
  });
};

const routes = [
  ...getMenuRoutes(routeConfig, true),
  {
    path: '*',
    redirect: '/dashboard/base',
  },
];

const route = new VueRouter({
  routes,
});

export default route;
