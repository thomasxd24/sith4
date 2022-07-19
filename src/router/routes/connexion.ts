import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/sign-in',
    name: 'sign-in',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/password-reset',
    name: 'password-reset',
    component: () => import('@/views/ResetPassword.vue'),
  },
];

export default routes;
