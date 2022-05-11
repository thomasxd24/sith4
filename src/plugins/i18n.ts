import { getBrowserLocale, dateTimeFormats, numberFormats } from "@/utils/i18n";
import { createI18n, LocaleMessages, VueMessageType } from "vue-i18n";

function getStartingLocale() {
  const browserLocale = getBrowserLocale({ countryCodeOnly: true });
  if (process.env.VUE_APP_I18N_SUPPORTED_LOCALE.split(",").includes(browserLocale)) return browserLocale;
  return process.env.VUE_APP_I18N_DEFAULT_LOCALE || "en";
}

/**
 * Load locale messages
 *
 * The loaded `JSON` locale messages is pre-compiled by `@intlify/vue-i18n-loader`, which is integrated into `vue-cli-plugin-i18n`.
 * See: https://github.com/intlify/vue-i18n-loader#rocket-i18n-resource-pre-compilation
 */
function loadLocaleMessages(): LocaleMessages<VueMessageType> {
  const locales = require.context("@/locales", true, /[A-Za-z0-9-_,\s]+\.json$/i);
  const messages: LocaleMessages<VueMessageType> = {};
  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\//i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = { ...messages[locale], ...locales(key) }; // merge all .json files together
    }
  });
  return messages;
}

export default createI18n({
  legacy: false,
  locale: getStartingLocale(),
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en",
  messages: loadLocaleMessages(),
  dateTimeFormats,
  numberFormats,
});
