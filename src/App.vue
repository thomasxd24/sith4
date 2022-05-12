<template>
  <v-app>
    <LanguagePopup v-model="showLanguagePopup" />

    <v-app-bar
      dense
      elevation="4"
      rounded
      shaped
      color="primary"
      class="navbar"
    >
      <template v-slot:prepend>
        <v-img
          aspect-ratio="1/1"
          width="64"
          height="64"
          src="@/assets/ae_logo.png"
          cover
        ></v-img>
      </template>

      <v-app-bar-title>
        <v-card class="navbar-title" color="primary">
          <v-card-title>Association des Étudiants</v-card-title>
          <v-card-subtitle>de l'université de Belfort-Montbéliard</v-card-subtitle>
        </v-card>
      </v-app-bar-title>

      <template v-slot:append>
        <v-btn @click="showThemePopup = true" icon="mdi-theme-light-dark"></v-btn>
        <v-btn @click="showLanguagePopup = true" icon="mdi-translate"></v-btn>
        <v-btn to="/sign-in" flat color="secondary">Connexion</v-btn>
        <v-btn to="/sign-up" flat color="secondary">Inscription</v-btn>
      </template>
    </v-app-bar>

    <router-view />
  </v-app>
  <!--
  <localized-link to="/">{{ $t('home.nav') }}</localized-link> |
  <localized-link to="/about">{{ $t('about.nav') }}</localized-link>
  <br>

  <footer>
    this one doesn't work (shouldn't be empty)
    <p>{{ $d(new Date(), "short", "en-US") }}</p>
    works somewhat properly
    <p>{{ $n(1000, "currency") }}</p>
  </footer> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LanguagePopup from '@/components/LanguagePopup.vue';

export default defineComponent({
  name: 'App',
  components: { LanguagePopup },
  data() {
    return {
      showThemePopup: false,
      showLanguagePopup: false,
    };
  },
  mounted() {
    /**
     * Watch for locale changes and set the document lang and direction.
     * ex: <html lang="en" dir="ltr">
     */
    this.$watch('$i18n.locale', (newLocale: string, oldLocale: string) => {
      if (newLocale === oldLocale) return;
      switch (newLocale) {
        case 'ar':
          document.dir = 'rtl';
          break;
        default:
          document.dir = 'ltr';
          break;
      }
    }, { immediate: true });
  },
});
</script>

<style lang="scss" src="./main.scss"></style>
