export default [
  {
    path: '/detail',
    icon: 'chart-pie',
    title: '详情页',
    component: () => import('@/layouts/td-layout.vue'),
    children: [
      {
        title: '基础详情页',
        path: 'base',
        component: () => import('@/pages/detail-base/index.vue'),
      },
      {
        title: '高级详情页',
        path: 'advanced',
        component: () => import('@/pages/detail-advanced/index.vue'),
      },
    ],
  },
  {
    path: '/list',
    icon: 'view-module',
    title: '列表页',
    component: () => import('@/layouts/td-layout.vue'),
    children: [
      {
        title: '基础列表页',
        path: 'base',
        component: () => import('@/pages/list-base.vue'),
      },
      {
        title: '基础筛选列表页',
        path: 'select',
        component: () => import('@/pages/list-select.vue'),
      },
      {
        title: '树状筛选列表页',
        path: 'tree',
        component: () => import('@/pages/list-tree.vue'),
      },
    ],
  },
  {
    path: '/form',
    icon: 'queue',
    title: '表单页',
    component: () => import('@/layouts/td-layout.vue'),
    children: [
      {
        title: '基础表单页',
        path: 'base',
        component: () => import('@/pages/form-base.vue'),
      },
      {
        title: '分步表单页',
        path: 'step',
        component: () => import('@/pages/form-step/index.vue'),
      },
    ],
  },
  {
    path: '/dashboard',
    icon: 'chart-pie',
    title: '仪表板',
    component: () => import('@/layouts/td-layout.vue'),
    children: [
      {
        title: '基础仪表盘',
        path: 'base',
        component: () => import('@/pages/demo.vue'),
        children: [
          {
            title: '基础仪表盘',
            path: 'base',
            component: () => import('@/pages/demo.vue'),
          },
        ],
      },
    ],
  },
];
