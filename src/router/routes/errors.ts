import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  { path: '/404', component: () => import('@/views/errors/PageNotFound.vue') },
  { path: '/maintenance', component: () => import('@/views/errors/Maintenance.vue') },
  { path: '/:pathMatch(.*)*', redirect: '/404' },
];

export default routes;
