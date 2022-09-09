import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/sign-in',
    name: 'sign-in',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register.vue'),
  },
  {
    path: '/password-reset',
    name: 'password-reset',
    component: () => import('@/views/ResetPassword.vue'),
  },
];

export default routes;
