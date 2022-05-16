<template>
  <v-app :theme="theme">
    <router-view />

    <v-snackbar
      v-model="snackbar.show"
      :timeout="snackbar.timeout"
      :color="snackbar.color"
      multi-line
      bottom
      right
    >
      {{ snackbar.message }}
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'App',
  data() {
    return {
      isDark: false,
      isColorblind: false,
      snackbar: {
        show: false,
        message: '',
        color: 'error',
        timeout: 4000,
      },

      // TODO: implement user authentification @TheoDurr
      user: {
        username: 'juknum',
        nickname: 'Tinople',
        lastName: 'Constant',
        firstName: 'Julien',
        notifications: 0,
      },

    };
  },
  setup() {
    const theme = ref('light');
    return {
      theme,
      toggleTheme: (str: string) => { theme.value = str; },
    };
  },
  methods: {
    switchTheme() {
      if (this.isDark && this.isColorblind) this.toggleTheme('colorblindDark');
      else if (this.isDark && !this.isColorblind) this.toggleTheme('dark');

      if (!this.isDark && this.isColorblind) this.toggleTheme('colorblindLight');
      else if (!this.isDark && !this.isColorblind) this.toggleTheme('light');
    },
    showSnackBar(message: string, options?: { stack?: Error, color?: string, timeout?: number }) {
      this.snackbar.message = message;
      if (options) {
        this.snackbar.color = options.color || '#222';
        this.snackbar.timeout = options.timeout || 4000;
        if (options.stack) console.error(options.stack);
      }

      this.snackbar.show = true;
    },
  },
  computed: {
    isUserLogged() {
      return !true; // TODO: implement user authentification with the API @TheoDurr
    },
  },
  mounted() {
    this.isDark = localStorage.getItem('isDark') === 'true' ? true : false || false;
    this.isColorblind = localStorage.getItem('isColorblind') === 'true' ? true : false || false;
    this.switchTheme();

    this.$watch('isDark', (newValue: boolean, oldValue: boolean) => {
      if (newValue === oldValue) return;
      localStorage.setItem('isDark', newValue.toString());
      this.switchTheme();
    });
    this.$watch('isColorblind', (newValue: boolean, oldValue: boolean) => {
      if (newValue === oldValue) return;
      localStorage.setItem('isColorblind', newValue.toString());
      this.switchTheme();
    });
  },
});

</script>

<style lang="scss" src="./main.scss"/>
