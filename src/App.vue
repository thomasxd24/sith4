<template>
  <v-app :theme="theme" :class="dark() ? '__background_color_primary' : '__background_color_white'">
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
import { defineComponent, ref, provide } from 'vue';
import {
  ThemeNames, GetTheme, SetTheme,
} from '@/types/injected';
import errorHandlerStore from '@/stores/errorHandler';
import NavbarNormal from '@/components/navbar/NavbarNormal.vue';

export default defineComponent({
  name: 'App',
  components: { NavbarNormal },
  setup() {
    const errorHandler = errorHandlerStore();
    const apiURL = process.env.VUE_APP_API_URL;
    provide('apiURL', apiURL);

    //#region THEME HANDLER
    const theme = ref('light');

    /**
     * Set theme within the div with id="app"
     * @param {ThemeNames} str the theme to set
     */
    const toggleTheme = (str: ThemeNames): void => { theme.value = str; };

    /** @returns {Boolean} If Dark theme is enabled */
    const dark: GetTheme = (): boolean => (localStorage.getItem('AE_UTBM_THEME_DARK') === 'true' ? true : false || false);

    /** @returns {Boolean} If Colorblind theme is enabled */
    const colorblind: GetTheme = (): boolean => (localStorage.getItem('AE_UTBM_THEME_COLORBLIND') === 'true' ? true : false || false);

    /**
     * Switch the theme accordingly to dark & colorblind values
     */
    const switchTheme = () => {
      if (dark() && colorblind()) toggleTheme('colorblindDark');
      else if (dark() && !colorblind()) toggleTheme('dark');

      if (!dark() && colorblind()) toggleTheme('colorblindLight');
      else if (!dark() && !colorblind()) toggleTheme('light');
    };

    const setDark: SetTheme = (value: boolean) => {
      localStorage.setItem('AE_UTBM_THEME_DARK', value.toString());
      window.location.reload();
      switchTheme();
    };
    const setColorblind: SetTheme = (value: boolean) => {
      localStorage.setItem('AE_UTBM_THEME_COLORBLIND', value.toString());
      window.location.reload();
      switchTheme();
    };

    provide('isThemeDark', dark);
    provide('isThemeColorblind', colorblind);
    provide('setThemeDark', setDark);
    provide('setThemeColorblind', setColorblind);

    provide('theme', theme);
    //#endregion

    const themedLogoURL = () => {
      const url = require.context('@/assets/logo/', false, /\.(png|jpe?g|svg)$/);
      return url(`./${dark() ? 'ae_white' : 'ae_base'}.png`);
    };
    provide('themedLogoURL', themedLogoURL);

    return {
      theme,
      errorHandler,
      dark,
      switchTheme,
    };
  },
  mounted() {
    this.switchTheme();
  },
});

</script>
