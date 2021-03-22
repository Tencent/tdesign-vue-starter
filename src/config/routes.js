export default [
    {
        path: '/dashboard',
        icon: 'chart-pie',
        title: '仪表板',
        component: '/src/layouts/default.vue',
        children: [
            {
                title: '基础仪表盘',
                path: 'base',
                component: '/src/pages/demo.vue',
                children: [            {
                    title: '基础仪表盘',
                    path: 'base',
                    component: '/src/pages/demo.vue',
                }]
            }
        ]
    },
    {
        path: '/list',
        icon: 'view-module',
        title: '列表页',
        component: '/src/layouts/base.vue',
        children: [
            {
                title: '基础列表页',
                path: 'base',
                component: '/src/pages/demo.vue',
            },
            {
                title: '筛选列表页',
                path: 'select',
                component: '/src/pages/list-select.vue',
            }
        ]
    },
    {
        path: '/form',
        icon: 'queue',
        title: '列表页',
        component: '/src/layouts/base.vue',
        children: [
            {
                title: '基础列表页',
                path: 'base',
                component: '/src/pages/list-base.vue',
            },
            {
                title: '筛选列表页',
                path: 'select',
                component: '/src/pages/list-select.vue',
            }
        ]
    },
]