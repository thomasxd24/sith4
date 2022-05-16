<template>
  <sith-main-navbar></sith-main-navbar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SithMainNavbar from '@/components/SithMainNavbar.vue';
import localizePath from '@/utils/i18n/localizePath';
import userStore from '@/stores/user';
import errorHandlerStore from '@/stores/errorHandler';

export default defineComponent({
  name: 'ProfileView',
  components: {
    SithMainNavbar,
  },
  setup() {
    const user = userStore();
    const errorHandler = errorHandlerStore();
    return { user, errorHandler };
  },
  mounted() {
    if (!this.user.isUserLoggedIn()) {
      this.$router.push(localizePath('/sign-in', this.$i18n.locale, this.$route.path, this.$router));
      this.errorHandler.show(this.$t('errors.login.required'), { color: 'error' });
    }
  },
});
</script>
