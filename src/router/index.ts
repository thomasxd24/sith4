import { createWebHistory, RouteRecordRaw } from 'vue-router';
import { createLangRouter } from 'vue-lang-router';

import { localizedURLs, translations } from '@/lang/index';
import { dateTimeFormats, getBrowserLocale, numberFormats } from '@/utils/i18n';

/**
 * --- Vue routes setup ---
 * Set up translations for routes:
 * >- add the route below
 * >- add the name in the @/lang/en/urls.json file
 */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: () => import('@/views/LoginPage.vue'),
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: () => import('@/views/LoginPage.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue'),
    children: [
      {
        path: ':id',
        name: 'profile-of',
        component: () => import('@/views/ProfileView.vue'),
      },
    ],
  },
];

// i18n routes adapter (to modify routes to the matching locale equivalent)
const langRouterOptions = {
  defaultLanguage: getBrowserLocale({ countryCodeOnly: true }),
  translations,
  localizedURLs,
  i18nOptions: {
    dateTimeFormats,
    numberFormats,
  },
};

// Vue router options
const routerOptions = {
  routes,
  history: createWebHistory(process.env.BASE_URL), // we don't want the '#' in the routes system
};

const router = createLangRouter(langRouterOptions, routerOptions);
export default router;
