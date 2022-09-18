<template>
  <v-app :theme="theme.isDark ? 'dark' : 'light'" :class="theme.isDark ? '__background_color_primary' : '__background_color_white'">
    <navbar-normal />

    <main class="main">
      <router-view />
    </main>

    <v-snackbar
      v-model="errorHandler.displayed"
      :timeout="errorHandler.timeout"
      :color="errorHandler.color"
      multi-line
      bottom
      right
    >
      {{ errorHandler.message }}
    </v-snackbar>
  </v-app>
</template>

<style lang="scss" scoped>
  @media (min-width: 1012px) {
    .main {
      padding-right: 32px !important;
      padding-left: 32px !important;
    }
  }
  @media (min-width: 768px){
    .main {
      padding-right: 24px !important;
      padding-left: 24px !important;
    }
  }

  .main {
    padding-bottom: 20px;
    padding-right: 16px !important;
    padding-left: 16px !important;
    max-width: 1280px;
    width: 100%;
    margin-top: 20px;
    margin-right: auto;
    margin-left: auto;
  }
</style>

<script lang="ts">
import { defineComponent, provide } from 'vue';
import errorHandlerStore from '@/stores/errorHandler';
import themeStore from '@/stores/theme';
import userStore from '@/stores/user';
import NavbarNormal from '@/components/navbar/NavbarNormal.vue';

export default defineComponent({
  name: 'App',
  components: { NavbarNormal },
  setup() {
    const apiURL = process.env.VUE_APP_API_URL;
    provide('apiURL', apiURL);

    return {
      theme: themeStore(),
      user: userStore(),
      errorHandler: errorHandlerStore(),
    };
  },
  mounted() {
    this.user.loadFromStorage();
    this.theme.loadFromStorage();
  },
});

</script>
