<template>
  <v-list :class="isDark() ? '__background_color_tertiary' : '__background_color_white'" v-bind="$attrs">
    <slot />
  </v-list>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { GetTheme } from '@/types/injected';

export default defineComponent({
  name: 'themed-list',
  setup() {
    const isDark: GetTheme = inject('isThemeDark') || (() => false);
    return { isDark };
  },
});
</script>
