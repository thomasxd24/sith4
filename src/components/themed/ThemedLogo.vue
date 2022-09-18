<template>
  <v-img :src="logo()" v-bind="$attrs">
    <slot />
  </v-img>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';

export default defineComponent({
  name: 'themed-logo',
  setup() {
    const logo: () => string = inject('themedLogoURL') || (() => '');
    return { logo };
  },
});
</script>
