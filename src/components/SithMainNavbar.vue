<template>
  <sith-language-popup v-model="showLanguagePopup" />
  <sith-theme-popup v-model="showThemePopup" />

  <v-app-bar
    dense
    shaped
    color="primary"
    style="position: initial"
  >
    <template v-slot:prepend>
      <localized-link to="/">
        <v-img
          aspect-ratio="1/1"
          width="64"
          height="64"
          src="@/assets/ae_logo.png"
          cover
        ></v-img>
      </localized-link>
    </template>

    <v-app-bar-title>
      <localized-link to="/" style="text-decoration: none; color: inherit;">
        <v-col>
          <v-row color="primary" class="navbar-title">Association des Étudiants</v-row>
          <v-row color="primary" class="navbar-subtitle">De l'Université de Technologie de Belfort-Montbéliard</v-row>
        </v-col>
      </localized-link>
    </v-app-bar-title>

    <template v-slot:append>
      <v-text-field
        v-if="user.isUserLoggedIn()"
        prepend-icon="mdi-magnify"
        hide-details
        class="navbar-search"
        v-model="search"
        @keydown.enter="startsSearch"
        @click:prepend="startsSearch"
        label="Search"
        density="compact"
        variant="plain"
      />
      <v-btn density="comfortable" small class="mr-2" @click="showThemePopup = true" icon="mdi-theme-light-dark"></v-btn>
      <v-btn density="comfortable" small class="mr-2" @click="showLanguagePopup = true" icon="mdi-translate"></v-btn>
      <sith-btn-localized v-if="!user.isUserLoggedIn()" to="/sign-in" flat class="rounded bg-secondary mr-1">{{ $t("nav_bar.btn_sign_in") }}</sith-btn-localized>
      <sith-btn-localized v-if="!user.isUserLoggedIn()" to="/sign-up" flat class="rounded bg-secondary mr-1">{{ $t("nav_bar.btn_sign_up") }}</sith-btn-localized>
    </template>
  </v-app-bar>
  <v-app-bar
    v-if="user.isUserLoggedIn()"
    dense
    shaped
    color="primary"
    class="navbar-user-menu"
  >
    <v-app-bar-title class="mr-4">
      <localized-link :to="'/en/profile/' + user.username" style="text-decoration: none; color: inherit" class="d-flex align-center">
        <v-col>
          <v-img src="@/assets/user_no_image.png" height="32" width="32" style="border-radius: 50%;" />
        </v-col>
        <v-col>
          <v-row class="navbar-user-menu-title">{{ user.name }}&nbsp;{{ user.lastname }}</v-row>
          <v-row class="navbar-user-menu-subtitle">{{ user.nickname }}</v-row>
        </v-col>
      </localized-link>
    </v-app-bar-title>
    <template v-slot:append>
      <v-btn density="comfortable" small class="mr-2" @click="''" icon="mdi-tune"></v-btn>

      <v-badge
        v-if="user.getNotificationsCount() > 0"
        class="mr-2"
        color="error"
        overlap
        :content="user.getNotificationsCount() > 99 ? '!' : user.getNotificationsCount()"
      >
        <v-btn density="comfortable" small @click="''"  icon="mdi-bell-ring"></v-btn>
      </v-badge>
      <v-btn v-else density="comfortable" small @click="''" icon="mdi-bell"></v-btn>

      <sith-btn-localized to="/" @click="user.logout()" flat class="rounded bg-tertiary ml-5 mr-1">{{ $t("nav_bar.btn_logout") }}</sith-btn-localized>
    </template>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import userStore from '@/stores/user';
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
      search: '',
    };
  },
  setup() {
    const user = userStore();
    return { user };
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
    startsSearch() {
      // TODO: implement search @TheoDurr
      // eslint-disable-next-line no-alert
      alert(`Search not implemented yet\n${this.search}`);
    },
  },
});
</script>

<style lang="scss">
.navbar {
  &-user-menu {
    max-width: fit-content;
    right: 0;
    border-radius: 0 0 0 20px;

    &-title {
      font-weight: 500;
      color: #eee;
    }

    &-subtitle {
      font-size: 0.8rem;
      color: #ddd;
    }
  }

  &-title {
    text-decoration: none;
    color: #fff;
  }

  &-subtitle {
    text-decoration: none;
    text-transform: uppercase;
    color: #ddd;
    font-size: .75rem;
  }

  &-search {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    padding-left: 10px;
    margin: 0 10px;

    > .v-input__prepend > .v-icon:hover {
      cursor: pointer;
    }

    > .v-input__control > .v-field {
      min-width: 400px;

      &--focused > .v-field__outline > .v-field-label {
        color: transparent;
      }
    }
  }
}

.v-toolbar__append {
  align-items: center;
}
</style>
