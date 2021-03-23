import routeConfig from '@/config/routes.js';

const getMenuRoutes = (list, parent) => {
    if (!list) {
        return [];
    }
    return list.map( item  => {
        const { path = '', component } = item;
        return {
            path: path,
            component: () => import(component),
            children: getMenuRoutes(item.children, item),
            meta: {
                title: item.title
            }
        }
    }) 
};

const routes = [
    ...getMenuRoutes(routeConfig),
    {
      path: '*',
      redirect: '/dashboard/base'
    }
]

export default routes;