import { defineStore } from 'pinia';
import themeStore from './theme';

export default defineStore('document', {
  state: () => ({
    title: "Association des Étudiants de l'Université de Belfort-Montbéliard",
  }),
  actions: {
    setPageTitle(str: string) {
      this.title = `${str} - Association des Étudiants de l'Université de Belfort-Montbéliard`;
      this.updateTitle();
    },
    resetPageTitle() {
      this.title = "Association des Étudiants de l'Université de Belfort-Montbéliard";
      this.updateTitle();
    },
    updateTitle() {
      document.title = this.title;
    },
  },
  getters: {
    logo(): string {
      const theme = themeStore();
      const url = require.context('@/assets/logo/', false, /\.(png|jpe?g|svg)$/);
      return url(`./${theme.isDark ? 'ae_white' : 'ae_base'}.png`);
    },
  },
});
