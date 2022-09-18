<template>
  <v-img :src="document.logo" v-bind="$attrs">
    <slot />
  </v-img>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import documentStore from '@/stores/document';

export default defineComponent({
  name: 'themed-logo',
  setup() {
    return { document: documentStore() };
  },
});
</script>
