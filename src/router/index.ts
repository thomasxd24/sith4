import { createWebHistory, RouteRecordRaw } from 'vue-router';
import { createLangRouter } from 'vue-lang-router';

import { localizedURLs, translations } from '@/lang/index';

import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import { dateTimeFormats, getBrowserLocale, numberFormats } from '@/utils/i18n';

// Vue routes setup
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
];

// i18n routes adapter (to translate routes to the matching locale)
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
