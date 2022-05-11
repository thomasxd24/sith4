import { createWebHistory, RouteRecordRaw } from "vue-router";
import { createLangRouter } from "vue-lang-router";

import translations from "@/lang/translations";
import localizedURLs from "@/lang/localized-urls";

import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import { dateTimeFormats, getBrowserLocale, numberFormats } from "@/utils/i18n";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
];

const langRouterOptions = {
  defaultLanguage: getBrowserLocale({ countryCodeOnly: true }),
  translations,
  localizedURLs,
  i18nOptions: {
    dateTimeFormats,
    numberFormats,
  },
};

const routerOptions = {
  routes,
  history: createWebHistory(process.env.BASE_URL),
};

const router = createLangRouter(langRouterOptions, routerOptions);
export default router;
