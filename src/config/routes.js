export default [
  {
    path: '/detail',
    icon: 'chart-pie',
    title: '详情页',
    component: '/src/layouts/td-layout.vue',
    children: [
      {
        title: '基础详情页',
        path: 'base',
        component: '/src/pages/detail-base.vue',
      },
      {
        title: '高级详情页',
        path: 'advanced',
        component: '/src/pages/detail-advanced.vue',
      },
    ],
  },
  {
    path: '/list',
    icon: 'view-module',
    title: '列表页',
    component: '/src/layouts/td-layout.vue',
    children: [
      {
        title: '基础列表页',
        path: 'base',
        component: '/src/pages/list-base.vue',
      },
      {
        title: '基础筛选列表页',
        path: 'select',
        component: '/src/pages/list-select.vue',
      },
      {
        title: '树状筛选列表页',
        path: 'tree',
        component: '/src/pages/list-tree.vue',
      },
    ],
  },
  {
    path: '/form',
    icon: 'queue',
    title: '表单页',
    component: '/src/layouts/td-layout.vue',
    children: [
      {
        title: '基础表单页',
        path: 'base',
        component: '/src/pages/form-base.vue',
      },
      {
        title: '分步表单页',
        path: 'step',
        component: '/src/pages/form-step.vue',
      },
    ],
  },
  {
    path: '/dashboard',
    icon: 'chart-pie',
    title: '仪表板',
    component: '/src/layouts/td-layout.vue',
    children: [
      {
        title: '基础仪表盘',
        path: 'base',
        component: '/src/pages/demo.vue',
        children: [
          {
            title: '基础仪表盘',
            path: 'base',
            component: '/src/pages/demo.vue',
          },
        ],
      },
    ],
  },
];
