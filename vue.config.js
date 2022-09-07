const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,

  configureWebpack: {
    devtool: 'source-map',
    experiments: {
      topLevelAwait: true,
    },
  },

  pluginOptions: {
    i18n: {
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true,
    },
    vuetify: {},
  },
});
