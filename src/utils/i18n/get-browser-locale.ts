export default (options: { countryCodeOnly: boolean } = { countryCodeOnly: false }): string => {
  const navigatorLocale = navigator.languages !== undefined
    ? navigator.languages[0]
    : navigator.language;

  if (!navigatorLocale) return "en";

  return options.countryCodeOnly
    ? navigatorLocale.trim().split(/-|_/)[0]
    : navigatorLocale.trim();
};

// todo: write tests:
/**
 * getBrowserLocale()                          // => "fr-FR"
 * getBrowserLocale({ countryCodeOnly: true }) // => "fr
 */
