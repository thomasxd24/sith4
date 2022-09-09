<template>
  <v-app-bar :color="isDark() ? 'secondary' : 'tertiary'" style="position: inherit !important;">
    <div class="left">
      <v-col class="logo">
        <v-img aspect-ratio="1/1" width="62" height="62" :src="logo()" cover></v-img>
      </v-col>
      <v-col class="name">
        <div class="title">Association des Étudiants</div>
        <div class="subtitle">De l'Université de Technologie de Belfort-Montbéliard</div>
      </v-col>
    </div>
    <div class="right">
      <div class="places" v-if="user.isUserLoggedIn()">
        <template v-for="place in places" v-bind:key="place" >
          <navbar-place :place="place.name" :status="place.status" />
        </template>
      </div>

      <navbar-buttons :isConnected="user.isUserLoggedIn()" />
    </div>

  </v-app-bar>
</template>

<style lang="scss">
  .v-overlay__content {
    transform: translate(calc(-100% + 28px));
  }
</style>

<style lang="scss" scoped>
  .left, .right {
    display: flex;
    align-items: center;
    width: 100%;
  }

  .right {
    justify-content: flex-end;
    gap: 40px;

    & > .places {
      display: flex;
    }
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
    font-size: 24px;
    line-height: 24px;
    max-height: 24px;
  }

  .subtitle {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 9.5px;
    line-height: 10px;
    height: 10px;
    text-transform: uppercase;
  }
</style>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { GetTheme } from '@/types/theme';
import userStore from '@/stores/user';
import NavbarPlace from './NavbarPlace.vue';
import NavbarButtons from './NavbarButtons.vue';

export default defineComponent({
  name: 'navbar-normal',
  components: { NavbarPlace, NavbarButtons },
  setup() {
    const user = userStore();
    const isDark: GetTheme = inject('isThemeDark') || (() => false);

    return { user, isDark };
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
  methods: {
    logo(): string {
      const url = require.context('@/assets/logo/', false, /\.(png|jpe?g|svg)$/);
      return url(`./${this.isDark() ? 'ae_white' : 'ae_base'}.png`);
    },
  },
});
</script>
