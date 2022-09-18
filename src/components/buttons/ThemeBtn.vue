<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn size="small" icon="mdi-white-balance-sunny" height="28" width="28" v-bind="props"></v-btn>
    </template>

    <themed-list>
      <v-switch flat v-model="dark" class="theme" :label="$t('theme_dark')" hide-details />
      <v-switch flat v-model="colorblind" class="theme" :label="$t('theme_colorblind')" hide-details />
    </themed-list>
  </v-menu>
</template>

<style lang="scss" scoped>
  .theme {
    padding-left: 10px;
    padding-right: 20px;
    opacity: 100%;
  }
</style>

<style lang="scss">
  .theme .v-input__control .v-selection-control {
    flex-direction: row-reverse;
    gap: 16px;
  }
</style>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { GetTheme, SetTheme } from '@/types/injected';
import ThemedList from '@/components/themed/ThemedList.vue';

export default defineComponent({
  name: 'theme-btn',
  components: { ThemedList },
  data() {
    return {
      dark: false,
      colorblind: false,
    };
  },
  setup() {
    const isThemeDark: GetTheme = inject('isThemeDark') || (() => false);
    const isThemeColorblind: GetTheme = inject('isThemeColorblind') || (() => false);
    const setThemeDark: SetTheme = inject('setThemeDark') || (() => false);
    const setThemeColorblind: SetTheme = inject('setThemeColorblind') || (() => false);
    return {
      isThemeDark,
      isThemeColorblind,
      setThemeDark,
      setThemeColorblind,
    };
  },
  watch: {
    // Watch for slider changes -> update associated theme
    dark(value: boolean) {
      if (value === this.isThemeDark()) return;
      this.setThemeDark(value);
    },
    colorblind(value: boolean) {
      if (value === this.isThemeColorblind()) return;
      this.setThemeColorblind(value);
    },
  },
  mounted() {
    // set default values to stored values
    this.dark = this.isThemeDark();
    this.colorblind = this.isThemeColorblind();
  },
});
</script>
