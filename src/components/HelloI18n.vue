<template>
  <p>{{ t('message') }}</p>
  <button @click="changeLocale">{{ locale }}</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "HelloI18n",
  setup() {
    const { t, locale } = useI18n({
      inheritLocale: true,
      useScope: "global",
    });

    return { t, locale };
  },
  methods: {
    changeLocale() {
      this.locale = this.locale === "en" ? "fr" : "en";
    },
  },
});
</script>
