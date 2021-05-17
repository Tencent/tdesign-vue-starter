export default [
  {
    path: '/dashboard',
    icon: 'chart-pie',
    title: '仪表盘',
    component: '../layouts/td-layout.tsx',
    children: [
      {
        title: '基础仪表盘',
        path: 'base',
        component: '../pages/dashboard-base/index.vue',
      },
      {
        title: '详情仪表盘',
        path: 'detail',
        component: '../pages/dashboard-detail/index.vue',
      },
    ],
  },
  {
    path: '/detail',
    icon: 'layers',
    title: '详情页',
    component: '../layouts/td-layout.tsx',
    children: [
      {
        title: '基础详情页',
        path: 'base',
        component: '../pages/list-base.vue',
        // 默认不填，则需要每个页面都会经过登录的校验，若不需要进行登录校验则将needLogin：设为false
        meta: { needLogin: false, title: '基础详情页' },
      },
      {
        title: '高级详情页',
        path: 'advanced',
        component: '../pages/detail-advanced/index.vue',
      },
      {
        title: '部署配置',
        path: 'deploy',
        component: '../pages/detail-deploy/index.vue',
      },
    ],
  },
  {
    path: '/list',
    icon: 'view-module',
    title: '列表页',
    component: '../layouts/td-layout.tsx',
    children: [
      {
        title: '基础列表页',
        path: 'base',
        component: '../pages/list-base.vue',
      },
      {
        title: '基础筛选列表页',
        path: 'select',
        component: '../pages/list-select.vue',
      },
      {
        title: '树状筛选列表页',
        path: 'tree',
        component: '../pages/list-tree.vue',
      },
    ],
  },
  {
    path: '/form',
    icon: 'queue',
    title: '表单页',
    component: '../layouts/td-layout.tsx',
    children: [
      {
        title: '基础表单页',
        path: 'base',
        component: '../pages/form-base/index.vue',
      },
      {
        title: '分步表单页',
        path: 'step',
        component: '../pages/form-step/index.vue',
      },
    ],
  },
  // 自定义登录页面
  // {
  //   path: '/login',
  //   title: '登录页面',
  //   children: [
  //     {
  //       title: '登录页面',
  //       path: 'index',
  //       meta: { needLogin: false },
  //       component: () => import('@/pages/login-index/index.vue'),
  //     },
  //   ],
  // },
];
