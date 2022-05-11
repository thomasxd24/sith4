import { i18n } from "vue-i18n";
import { Router, RouterOptions } from "vue-router";

declare module "vue-lang-router" {}

interface LanguageOptions {
  defaultLanguage: string;
  translations: { [lang: string]: { name: string; load() } };
  localizedURLs: { [lang: string]: { [key: string]: unknown } };
  i18nOptions?: unknown;
}

export { i18n };
export function createLangRouter(languageOptions: LanguageOptions, routerOptions: RouterOptions): Router;
