import { createWebHistory, RouteRecordRaw } from 'vue-router';
import { createLangRouter } from 'vue-lang-router';

import { localizedURLs, translations } from '@/lang/index';
import { dateTimeFormats, getBrowserLocale, numberFormats } from '@/utils/i18n';

import connexionRoutes from '@/router/routes/connexion';
import userRoutes from '@/router/routes/user';
import errorRoutes from '@/router/routes/errors';

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
    component: () => import('@/views/Home.vue'),
  },
  ...connexionRoutes,
  ...userRoutes,
  ...errorRoutes,
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

router.beforeEach((to, from, next) => {
  if (to.path === '/') next(); // avoid infinite loop
  if (to.fullPath.endsWith('/')) next(to.fullPath.slice(0, -1));
  else next();
});

export default router;
