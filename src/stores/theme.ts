import { defineStore } from 'pinia';

const theme = {
  dark: false,
  colorblind: false,
};

export default defineStore('theme', {
  state: () => theme,
  actions: {
    toggleDark() {
      this.dark = !this.dark;
      localStorage.setItem('AE_UTBM_THEME_DARK', this.dark.toString());
    },
    toggleColorblind() {
      this.colorblind = !this.colorblind;
      localStorage.setItem('AE_UTBM_THEME_COLORBLIND', this.colorblind.toString());
    },
    isDark(): boolean {
      return this.dark;
    },
    isColorblind(): boolean {
      return this.colorblind;
    },
    loadFromStorage(): void {
      this.dark = localStorage.getItem('AE_UTBM_THEME_DARK') === 'true';
      this.colorblind = localStorage.getItem('AE_UTBM_THEME_COLORBLIND') === 'true';
    },
  },
});
