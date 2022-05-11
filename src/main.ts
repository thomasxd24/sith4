import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import { i18n } from 'vue-lang-router';

const app = createApp(App);
app.use(router).use(i18n).mount('#app');
