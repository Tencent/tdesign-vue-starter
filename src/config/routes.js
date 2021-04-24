export default [
  {
    path: '/dashboard',
    icon: 'chart-pie',
    title: '仪表盘',
    component: () => import('@/layouts/td-layout.vue'),
    children: [
      {
        title: '基础仪表盘',
        path: 'base',
        component: () => import('@/pages/dashboard-base/index.vue'),
      },
      {
        title: '详情仪表盘',
        path: 'detail',
        component: () => import('@/pages/dashboard-detail/index.vue'),
      },
    ],
  },
  {
    path: '/detail',
    icon: 'layers',
    title: '详情页',
    component: () => import('@/layouts/td-layout.vue'),
    children: [
      {
        title: '基础详情页',
        path: 'base',
        component: () => import('@/pages/detail-base/index.vue'),
        // 默认不填，则需要每个页面都会经过登录的校验，若不需要进行登录校验则将needLogin：设为false
        meta: { needLogin: false },
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
        component: () => import('@/pages/form-base/index.vue'),
      },
      {
        title: '分步表单页',
        path: 'step',
        component: () => import('@/pages/form-step/index.vue'),
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
