import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    redirect: '/search',
    children: [
      {
        path: 'search',
        component: () => import('pages/SearchPage.vue')
      },
      {
        path: 'create',
        component: () => import('pages/CreateClientPage.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('pages/LoginPage.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
