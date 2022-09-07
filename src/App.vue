<template>
  <v-app :theme="theme" style="background-color: #ecf2f8">
    <navbar-normal />

    <router-view />

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

<script lang="ts">
import { defineComponent, ref, provide } from 'vue';
import {
  ThemeNames, GetTheme, SetTheme,
} from '@/types/theme';
import errorHandlerStore from '@/stores/errorHandler';
import NavbarNormal from '@/components/navbar/NavbarNormal.vue';

export default defineComponent({
  name: 'App',
  components: { NavbarNormal },
  setup() {
    const errorHandler = errorHandlerStore();

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
      switchTheme();
    };
    const setColorblind: SetTheme = (value: boolean) => {
      localStorage.setItem('AE_UTBM_THEME_COLORBLIND', value.toString());
      switchTheme();
    };

    provide('isThemeDark', dark);
    provide('isThemeColorblind', colorblind);
    provide('setThemeDark', setDark);
    provide('setThemeColorblind', setColorblind);

    provide('theme', theme);
    //#endregion

    return {
      theme,
      errorHandler,
      switchTheme,
    };
  },
  mounted() {
    this.switchTheme();
  },
});

</script>
