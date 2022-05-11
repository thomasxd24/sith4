import { createApp } from 'vue';
import { i18n } from 'vue-lang-router';
import { loadFonts } from '@/plugins/webfontloader';
import App from '@/App.vue';
import router from '@/router';
import vuetify from '@/plugins/vuetify';

loadFonts();

createApp(App)
  .use(router)
  .use(i18n)
  .use(vuetify)
  .mount('#app');
