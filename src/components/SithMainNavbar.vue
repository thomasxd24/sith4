<template>
  <sith-language-popup v-model="showLanguagePopup" />
  <sith-theme-popup v-model="showThemePopup" />

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
      <v-btn class="mr-1" @click="showThemePopup = true" icon="mdi-theme-light-dark"></v-btn>
      <v-btn class="mr-1" @click="showLanguagePopup = true" icon="mdi-translate"></v-btn>
      <sith-btn-localized to="/sign-in" flat class="rounded bg-secondary mr-1">{{ $t("nav_bar.btn_sign_in") }}</sith-btn-localized>
      <sith-btn-localized to="/sign-up" flat class="rounded bg-secondary mr-1">{{ $t("nav_bar.btn_sign_up") }}</sith-btn-localized>
    </template>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SithLanguagePopup from '@/components/SithLanguagePopup.vue';
import SithThemePopup from '@/components/SithThemePopup.vue';
import SithBtnLocalized from '@/components/SithBtnLocalized.vue';
import localizePath from '@/utils/i18n/localizePath';

export default defineComponent({
  name: 'sith-main-navbar',
  components: { SithThemePopup, SithLanguagePopup, SithBtnLocalized },
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
  methods: {
    localizePath(path: string) {
      return localizePath(path, this.$i18n.locale, this.$route.path, this.$router);
    },
  },
});
</script>

<style lang="scss">
.navbar {
  position: initial !important;

  &-title {
    >.v-card-title,
    >.v-card-subtitle {
      padding: 0;
    }

    > .v-card-title {
      line-height: initial;
    }

    > .v-card-subtitle {
      text-transform: uppercase;
    }
  }
}

.v-toolbar__append {
  align-items: center;
}
</style>
