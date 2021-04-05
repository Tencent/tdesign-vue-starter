import routeConfig from '@/config/routes.js';

const getMenuRoutes = (list) => {
  if (!list) {
    return [];
  }
  return list.map((item) => {
    const { path = '', component } = item;
    return {
      path,
      component: () => import(/* @vite-ignore */ component),
      children: getMenuRoutes(item.children, item),
      meta: {
        title: item.title,
      },
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

export default routes;
