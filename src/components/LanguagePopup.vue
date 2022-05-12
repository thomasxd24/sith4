<template>
  <v-dialog
    v-model="show"
    max-width="500px"
  >
    <v-card>
      <v-card-title>Sélectionnez une langue</v-card-title>

      <ul>
        <li v-for="link in links" :class="'router-language-switcher-item ' + link.activeClass" :key="link.langIndex">
          <a :href="link.url">
            <span class="img" :style="{ 'background-image': '' }" />
            <span class="txt">{{ link.langName }}</span>
          </a>
        </li>
      </ul>

    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { localizedURLs, translations } from '@/lang';
import { getBrowserLocale } from '@/utils/i18n';

export default defineComponent({
  name: 'LanguagePopup',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const DEFAULT_LINKS: { activeClass: string, langIndex: string, langName: string, url: string }[] = [];
    return {
      links: DEFAULT_LINKS,
    };
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value: boolean) {
        this.$emit('input', value);
      },
    },
  },
  mounted() {
    this.generateLinks();

    this.$watch('$router.currentRoute.value.fullPath', () => {
      this.generateLinks();
    }, { immediate: true });
  },
  methods: {
    /**
     * Get the appropriate background image url for the given language.
     * @param {String} lang the given language (2 letters code)
     */
    getURL(lang: string): string {
      switch (lang) {
        case 'en': return "url('https://flagcdn.com/gb.svg')";
        default: return `url('https://flagcdn.com/${lang}.svg')`;
      }
    },
    generateLinks() {
      this.links = Object.keys(translations).map((lang: string) => ({
        activeClass: lang === this.$i18n.locale ? 'active' : '',
        langIndex: lang,
        langName: translations[lang].name,
        url: this.localizePath(this.$router.currentRoute.value.fullPath, lang),
      }));
    },
    localizePath(fullPath: string, lang: string): string {
      // if desired language does not exist OR is not defined, use current one
      // eslint-disable-next-line no-param-reassign
      if (!lang || !localizedURLs[lang]) lang = this.$i18n.locale;

      // split query & base path
      let path = fullPath;
      let query = '';

      if (fullPath.includes('?')) [path, query] = fullPath.split('?');
      else if (fullPath.includes('#')) {
        [path, query] = fullPath.split('#');
        query = `#${query}`;
      }

      // split path into chunks
      const pathChunks = path.split('/');
      const pathLang: string | boolean = localizedURLs[pathChunks[1]] ? pathChunks[1] : false;

      // if the language is default language
      // & current path doesn't contain any language
      // & path to translate doesn't contain a language
      // -> return the same path (no need to translate it)
      const currentPathLang = this.$route.path.split('/')[1];
      if (lang === getBrowserLocale({ countryCodeOnly: true }) && !localizedURLs[currentPathLang] && !pathLang) return fullPath;

      // if the path is in some language already
      let resolvedPath;
      if (pathLang) {
        // get the original path
        const resolvedRoute = this.$router.resolve(path);

        if (resolvedRoute.matched.length !== 0) {
          resolvedPath = resolvedRoute.matched[resolvedRoute.matched.length - 1];
          resolvedPath = (resolvedPath.aliasOf ? resolvedPath.aliasOf.path : resolvedPath.path);
          resolvedPath = (resolvedPath.charAt(0) === '/' ? resolvedPath : `/${resolvedPath}`);
        } else throw new Error('Could not resolve path!');

        // remove the language from path
        pathChunks.splice(1, 1);
        path = pathChunks.join('/');
      }

      // translate path
      const translatedPath: string = this.translatePath(path, lang, pathLang as string, (resolvedPath || path));

      // add language prefix to the path
      return `/${lang}${translatedPath.charAt(0) !== '/' ? '/' : ''}${translatedPath}${query}`;
    },
    translatePath(path: string, langTo: string, langFrom: string, matchedPath: string): string {
      // split the path into chunks
      const pathChunks = path.split('/');

      // if the path is in some language already
      if (langFrom && localizedURLs[langFrom]) {
        // if the path origin & target are the same, do not translate it
        if (langTo === langFrom) return path;

        // create reversed map of localizedURLs in given language
        const map = localizedURLs[langFrom]; // 'fr' urls
        const reversedMap: {[key: string]: string} = {}; // 'en' -> 'fr' urls
        Object.keys(map).forEach((key: string) => { reversedMap[map[key]] = key; });

        // split the matched path into chunks
        const matchedPathChunks = matchedPath.split('/');

        // translate the path back to original path names
        for (let i = 0; i < pathChunks.length; i += 1) {
          const pathChunk = pathChunks[i];

          // if the original path chunk is a variable, do not translate it
          // if there is an alias, use it, otherwise use the original path
          if (matchedPathChunks[i].charAt(0) !== ':') pathChunks[i] = reversedMap[pathChunk] || pathChunk;
          else pathChunks[i] = `::${pathChunk}`; // avoid translating variables that are also translated in the urls file
        }
      }

      // translate all the non-variable path chunks
      for (let i = 0; i < pathChunks.length; i += 1) {
        const pathChunk = pathChunks[i];

        // if the path chunk is a variable, do not translate it
        // if there is an alias, use it, otherwise use the original path
        if (!pathChunks[i].includes(':')) pathChunks[i] = localizedURLs[langTo][pathChunk] || pathChunk;
      }

      // join chunks into a path
      return pathChunks.join('/').replaceAll('::', ''); // remove indicator of variables that are also translated in the urls file
    },
  },
});
</script>
