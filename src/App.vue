<template>
  <nav>
    <router-link :to="{ name: 'home', params: { lang: locale } }">{{ t("pages.home") }}</router-link> |
    <router-link :to="{ name: 'about', params: { lang: locale } }">{{ t("pages.about") }}</router-link>
    <br>
    <LangSwitcher/>
    <main class="container">
      <router-view/>
    </main>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { setDocumentDirectionPerLocale, setDocumentLang } from "@/utils/i18n";
import LangSwitcher from "@/components/LangSwitcher.vue";

export default defineComponent({
  name: "App",
  components: {
    LangSwitcher,
  },
  setup() {
    const { t, locale } = useI18n({
      inheritLocale: true,
      useScope: "global",
    });
    return { t, locale };
  },
  mounted() {
    /**
     * Watch for locale changes and set the document lang and direction.
     * ex: <html lang="en" dir="ltr">
     */
    this.$watch("locale", (newLocale: string, oldLocale: string) => {
      if (newLocale === oldLocale) return;

      setDocumentDirectionPerLocale(newLocale);
      setDocumentLang(newLocale);
    }, { immediate: true });
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
