<template>
  <v-app :theme="theme">
    <div style="max-width: 1080px; width: 100%; margin: 0 auto">
      <router-view />
    </div>
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
