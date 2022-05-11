<template>
  <select v-model="lang">
    <option v-for="_lang in langs" :key="_lang">{{ _lang }}</option>
  </select>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import { ref, watch, defineComponent } from "vue";
import i18n from "@/plugins/i18n";

export default defineComponent({
  name: "LangSwitcher",
  inject: ["$t", "$locale"],
  setup() {
    const lang = ref(localStorage.getItem("lang") || process.env.VUE_APP_I18N_FALLBACK_LOCALE);
    const langs = process.env.VUE_APP_I18N_SUPPORTED_LOCALE.split(",");
    const router = useRouter();

    watch(() => lang.value, (oldLang, newLang) => {
      if (oldLang !== newLang) {
        const currentPathObject = router.currentRoute.value;
        localStorage.setItem("lang", lang.value);
        i18n.global.locale.value = lang.value;
        router.push({
          name: currentPathObject.name || undefined,
          params: {
            lang: i18n.global.locale.value,
          },
        });
      }
    });

    return {
      lang, langs,
    };
  },
});

</script>
