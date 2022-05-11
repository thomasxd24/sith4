export default {
  en: {
    name: "English",
    load: () => import("./en.json"),
  },
  fr: {
    name: "Français",
    load: () => import("./fr.json"),
  },
};
