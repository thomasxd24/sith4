<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn size="small" icon="mdi-translate" height="28" width="28" v-bind="props"></v-btn>
    </template>

    <themed-list>
      <v-list-item v-for="(lang, index) in links"
        :key="index"
        :class="lang.active ? 'lang active' : 'lang'"
        :href="lang.active ? '' : lang.url"
      >
        <v-list-item-title class="lang-name">{{ lang.name }}</v-list-item-title>
        <v-img class="lang-flag" :src="require(`@/assets/flags/${lang.code === 'en' ? 'uk' : lang.code}.svg`)" alt="flag" />
      </v-list-item>
    </themed-list>
  </v-menu>
</template>

<style lang="scss" scoped>
  .lang {
    background-color: transparent;
    display: flex;
    justify-content: space-between;
    width: 145px;

    &-name {
      text-align: right;
      padding-right: 16px;
      width: 96px;
    }

    &-flag {
      width: 25px;
    }

    &:hover {
      background-color: transparent;
    }
  }

  .lang.active {
    > .lang-name {
      font-weight: bold;
    }
  }
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { translations } from '@/lang';
import localizePath from '@/utils/i18n/localizePath';
import ThemedList from '@/components/themed/ThemedList.vue';

export default defineComponent({
  name: 'translate-btn',
  components: { ThemedList },
  data() {
    const DEFAULT_LINKS: Array<{
            active: string;
            code: string;
            name: string;
            url: string;
        }> = [];
    return {
      links: DEFAULT_LINKS,
    };
  },
  mounted() {
    this.generateLinks();
    this.$watch('$router.currentRoute.value.fullPath', () => {
      this.generateLinks();
    }, { immediate: true });
  },
  methods: {
    generateLinks() {
      this.links = Object.keys(translations).map((lang: string) => ({
        active: lang === this.$i18n.locale ? 'active' : '',
        code: lang,
        name: translations[lang].name,
        url: localizePath(this.$router.currentRoute.value.fullPath, lang, this.$route.path, this.$router),
      }));
    },
  },
});
</script>
