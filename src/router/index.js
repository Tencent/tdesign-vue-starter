import routeConfig from '@/config/routes.js';
import VueRouter from 'vue-router';

const getMenuRoutes = (list) => {
  if (!list) {
    return [];
  }
  return list.map((item) => {
    const { path = '', component, meta = { title: item.title } } = item;
    return {
      path,
      component,
      children: getMenuRoutes(item.children, item),
      meta,
    };
  });
};

const routes = [
  ...getMenuRoutes(routeConfig),
  {
    path: '*',
    redirect: '/dashboard/base',
  },
];

const route = new VueRouter({
  routes,
});

export default route;
