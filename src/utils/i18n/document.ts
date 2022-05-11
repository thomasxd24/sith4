const setDocumentDirectionPerLocale = (locale: string) => { document.dir = locale === "ar" ? "rtl" : "ltr"; };
const setDocumentLang = (lang: string): void => { document.documentElement.lang = lang; };

export { setDocumentDirectionPerLocale, setDocumentLang };
