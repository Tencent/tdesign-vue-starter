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
            }
        }) 
    };

const routes = [
    ...getMenuRoutes(routeConfig)
]

export default routes;