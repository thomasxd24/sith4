<template>
  <language-switcher v-slot="{ links }" tag="ul">
    <li v-for="link in links" :class="'router-language-switcher-item ' + link.activeClass" :key="link.langIndex">
      <a :href="link.url">
        <span class="img" :style="{ 'background-image': getURL(link.langIndex) }" />
        <span class="txt">{{ link.langName }}</span>
      </a>
    </li>
  </language-switcher>
  <localized-link to="/">{{ $t('home.nav') }}</localized-link> |
  <localized-link to="/about">{{ $t('about.nav') }}</localized-link>

  <router-view />

  <footer>
    <!-- this one doesn't work (shouldn't be empty) -->
    <p>{{ $d(new Date(), "short", "en-US") }}</p>
    <!-- works somewhat properly -->
    <p>{{ $n(1000, "currency") }}</p>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
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
  methods: {
    /**
     * Get the appropriate background image url for the given language.
     * @param {String} lang the given language (2 letters code)
     */
    getURL(lang: string) {
      switch (lang) {
        case 'en': return "url('https://flagcdn.com/gb.svg')";
        default: return `url('https://flagcdn.com/${lang}.svg')`;
      }
    },
  },
});
</script>

<style lang="scss" src="./main.scss"></style>
