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
        path: 'create/individual',
        component: () => import('pages/CreateClientPage.vue')
      },
      {
        path: 'create/legal',
        component: () => import('pages/CreateLegalPage.vue')
      },
      {
        path: 'client-details',
        component: () => import('pages/ClientDetail.vue')
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
