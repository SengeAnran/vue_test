export const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: '首页',
    component: () => import('@/pages/home.vue'),
  },
  {
    path: '/about',
    name: '关于',
    component: () => import('../pages/about.vue'),
  },
  {
    path: '/user/:id/:username',
    name: '用户',
    meta: {
      id: 12,
    },
    component: () => import('@/pages/user.vue'),
  },
];