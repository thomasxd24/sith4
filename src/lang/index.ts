import type { Translations, LocalizedURLs } from 'vue-lang-router';

const langs = process.env.VUE_APP_I18N_SUPPORTED_LOCALE.split(',');
const localizedURLs: LocalizedURLs = {};
const translations: Translations = {};

for (let i = 0; i < langs.length; i += 1) {
  const lang = langs[i];

  if (lang !== 'en') localizedURLs[lang] = { ...(await import(`./${lang}/urls.json`)) };

  const data = await import(`./${lang}/index.json`);
  translations[lang] = { name: data.lang_name, load: () => import(`./${lang}/index.json`) };
}

export { localizedURLs, translations };
