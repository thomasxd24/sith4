<template>
  <nav>
    <router-link :to="{ name: 'home', params: { lang: locale } }">{{ t("pages.home") }}</router-link> |
    <router-link :to="{ name: 'about', params: { lang: locale } }">{{ t("pages.about") }}</router-link>
    <br>
    <LangSwitcher/>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LangSwitcher from "@/components/LangSwitcher.vue";

export default defineComponent({
  name: "MainView",
  components: {
    LangSwitcher,
  },
});

</script>
