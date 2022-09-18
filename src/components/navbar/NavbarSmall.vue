<template>
  <v-app-bar
    :color="theme.isDark ? 'secondary' : 'tertiary'"
    class="header"
    height="136"
  >
    <div class="content">
      <div class="head">
        <div class="logo">
          <themed-logo aspect-ratio="1/1" width="48" height="48" cover/>
        </div>
        <div class="name">
          <div class="title">Association des Étudiants</div>
          <div class="subtitle">De l'Université de Technologie de Belfort-Montbéliard</div>
        </div>
      </div>

      <div class="places">
        <div v-if="!user.isLoggedIn()" class="connexion_btns">
          <localize-btn size="small" to="/login">{{ $t("navbar_sign_in") }}</localize-btn>
          <localize-btn size="small" to="/register">{{ $t("navbar_sign_up") }}</localize-btn>
        </div>
        <template v-else v-for="place in places" v-bind:key="place" >
          <navbar-place :place="place.name" :status="place.status" />
        </template>
      </div>

      <div class="buttons">
        <v-btn v-if="user.isLoggedIn()" size="small" icon="mdi-magnify" height="28" width="28" disabled></v-btn>
        <translate-btn />
        <theme-btn />
        <profile-btn v-if="user.isLoggedIn()" />
      </div>
    </div>
  </v-app-bar>
</template>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.places, .head, .buttons {
  display: flex;
  flex-direction: row;
}

.head {
  padding: 5px 5px 5px 0;
}

.buttons {
  margin-top: 10px;
  gap: 20px;
}

.logo {
  max-width: 62px;
  padding: 0;
}

.name {
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.title {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 18px;
  max-height: 18px;
}

.subtitle {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 7px;
  line-height: 10px;
  height: 10px;
  text-transform: uppercase;
}

.header {
  z-index: 100;
  position: inherit !important;

  > .v-toolbar__content {
    height: auto !important;
    display: flex;
    flex-direction: column;
  }
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import themeStore from '@/stores/theme';
import userStore from '@/stores/user';
import LocalizeBtn from '@/components/localized/LocalizedBtn.vue';
import TranslateBtn from '@/components/buttons/TranslateBtn.vue';
import ThemeBtn from '@/components/buttons/ThemeBtn.vue';
import ProfileBtn from '@/components/buttons/ProfileBtn.vue';
import ThemedLogo from '../themed/ThemedLogo.vue';
import NavbarPlace from './NavbarPlace.vue';

export default defineComponent({
  name: 'navbar-small',
  components: {
    ThemedLogo,
    NavbarPlace,
    LocalizeBtn,
    TranslateBtn,
    ProfileBtn,
    ThemeBtn,
  },
  setup() {
    return {
      theme: themeStore(),
      user: userStore(),
    };
  },
  computed: {
    // TODO: use an API call here & store them in a store
    places(): Array<{name: string, status: 'online' | 'offline' | 'unknown'}> {
      return [
        { name: 'Foyer', status: 'online' },
        { name: 'Gommette', status: 'offline' },
        { name: 'MDE', status: 'unknown' },
      ];
    },
  },
});
</script>
