// TODO: write something to automatically exports all .json files as default
//! take into account a sub-folder system (en/**/*.json)

// TODO: move /localized-urls/<LOCALE>.json to ../<LOCALE>/urls.json
// TODO: move /translations/<LOCALE>.json to ../<LOCALE>/main.json
//! move this file to ../ & fix imports & merge /localized-urls/index.ts into this one (once moved)

// TODO: "name" field should be part of the index.json (something like: '{"langName": "English" ...}')

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
