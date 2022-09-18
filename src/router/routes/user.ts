import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/Home.vue'),
    children: [
      {
        path: ':id',
        name: 'profile-of',
        component: () => import('@/views/Home.vue'),
      },
    ],
  },
];

export default routes;
