import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// import { h } from "vue";
import i18n from "@/plugins/i18n";
import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";

const locale = i18n.global.locale.value;

//! routes are fucked up, they don't render properly
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: `/${locale}`,
  },
  {
    path: "/:lang",
    name: "root",
    //! it is related to this line (does nothing)
    component: {
      template: "template: '<router-view />'",
    },
    children: [
      {
        path: "home",
        name: "home",
        component: HomeView,
      },
      {
        path: "about",
        name: "about",
        component: AboutView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const lang = to.params.lang as string;
  if (!["en", "fr"].includes(lang)) return next("en");
  if (i18n.global.locale.value !== lang) i18n.global.locale.value = lang;

  return next();
});

export default router;
