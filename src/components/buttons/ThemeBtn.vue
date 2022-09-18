<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn size="small" icon="mdi-white-balance-sunny" height="28" width="28" v-bind="props"></v-btn>
    </template>

    <themed-list :class="$vuetify.display.smAndUp ? '' : 'full'">
      <v-switch flat v-model="dark" class="theme" :label="$t('theme_dark')" hide-details />
      <v-switch disabled flat v-model="colorblind" class="theme" :label="$t('theme_colorblind')" hide-details />
    </themed-list>
  </v-menu>
</template>

<style lang="scss" scoped>
.theme {
  padding-left: 10px;
  padding-right: 20px;
  opacity: 100%;
}

.full {
  top: 15px;
  left: -12px;
  z-index: 1;
  width: calc(100vw);
}
</style>

<style lang="scss">
  .theme .v-input__control .v-selection-control {
    flex-direction: row-reverse;
    gap: 16px;
  }
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import themeStore from '@/stores/theme';
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
    return {
      theme: themeStore(),
    };
  },
  watch: {
    // Watch for slider changes -> update associated theme
    dark(value: boolean) {
      if (value === this.theme.isDark) return;
      this.theme.toggleDark();
    },
    colorblind(value: boolean) {
      if (value === this.theme.isColorblind) return;
      this.theme.toggleColorblind();
    },
  },
  beforeCreate() {
    this.theme.$subscribe(() => {
      this.dark = this.theme.isDark;
      this.colorblind = this.theme.isColorblind;
    });
  },
});
</script>
