<template>
  <sith-main-navbar></sith-main-navbar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SithMainNavbar from '@/components/SithMainNavbar.vue';
import localizePath from '@/utils/i18n/localizePath';

export default defineComponent({
  name: 'ProfileView',
  components: {
    SithMainNavbar,
  },
  mounted() {
    if (!this.$root.isUserLogged) {
      this.$router.push(localizePath('/sign-in', this.$i18n.locale, this.$route.path, this.$router));
      this.$root.showSnackBar(this.$t('errors.login_required'), { color: 'error' });
    }
  },
});
</script>
