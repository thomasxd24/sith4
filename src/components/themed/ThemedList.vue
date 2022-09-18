<template>
  <v-list :class="theme.isDark ? '__background_color_tertiary' : '__background_color_white'" v-bind="$attrs">
    <slot />
  </v-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import themeStore from '@/stores/theme';

export default defineComponent({
  name: 'themed-list',
  setup() {
    return { theme: themeStore() };
  },
});
</script>
