import { defineStore } from 'pinia';

export default defineStore('document', {
  state: () => ({
    title: 'Association des Étudiants de l\'Université de Belfort-Montbéliard',
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
});
