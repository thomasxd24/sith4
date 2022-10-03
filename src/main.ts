import { createApp } from 'vue';
import { i18n } from 'vue-lang-router';
import { loadFonts } from '@/plugins/webfontloader';
import { createPinia } from 'pinia';
import * as Sentry from '@sentry/vue';
import App from '@/App.vue';
import router from '@/router';
import vuetify from '@/plugins/vuetify';

import '@/assets/main.scss';
import { BrowserTracing } from '@sentry/tracing';

loadFonts();

const app = createApp(App);

Sentry.init({
  app,
  dsn: process.env.VUE_APP_SENTRY_DSN,
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ['localhost', 'https://ae.utbm.fr', /^\//],
    }),
  ],
  tracesSampleRate: 1.0,
});

app.use(createPinia())
  .use(router)
  .use(i18n)
  .use(vuetify)
  .mount('#app');
