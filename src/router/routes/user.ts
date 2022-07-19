import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/Profile.vue'),
    children: [
      {
        path: ':id',
        name: 'profile-of',
        component: () => import('@/views/Profile.vue'),
      },
    ],
  },
];

export default routes;
