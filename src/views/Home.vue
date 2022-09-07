<template>
  Home
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
  mounted() {
    /**
     * Watch for locale changes and set the document lang and direction.
     * ex: <html lang="en" dir="ltr">
     */
    this.$watch('$i18n.locale', (newLocale: string, oldLocale: string) => {
      if (newLocale === oldLocale) return;
      switch (newLocale) {
        case 'ar':
          document.dir = 'rtl';
          break;
        default:
          document.dir = 'ltr';
          break;
      }
    }, { immediate: true });
  },
});
</script>
