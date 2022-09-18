import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register.vue'),
  },
  // TODO: add a route for the reset password page
  // {
  //   path: '/password-reset',
  //   name: 'password-reset',
  //   component: () => import('@/views/Home.vue'),
  // },
];

export default routes;
