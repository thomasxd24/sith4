import { RouteRecordRaw } from 'vue-router';

// TODO: Add 404 & Maintenance page
const routes: Array<RouteRecordRaw> = [
  { path: '/404', component: () => import('@/views/Home.vue') },
  { path: '/maintenance', component: () => import('@/views/Home.vue') },
  { path: '/:pathMatch(.*)*', redirect: '/404' },
];

export default routes;
