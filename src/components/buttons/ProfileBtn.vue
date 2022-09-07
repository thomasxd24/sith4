<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" size="small" icon height="28" width="28" >
        <v-img :src="picture" />
      </v-btn>
    </template>

    <themed-list>
      <v-list-item @click="() => ''">
        <v-list-item-title>
          <localized-link to="profile" style="" class="item">{{ $t('user_profile') }}</localized-link>
        </v-list-item-title>
      </v-list-item>

      <v-list-item @click="() => ''">
        <v-list-item-title class="item">{{ $t('user_notifications') }}</v-list-item-title>
      </v-list-item>

      <v-list-item @click="user.logout()">
        <v-list-item-title class="item __color_danger">{{ $t('user_logout') }}</v-list-item-title>
      </v-list-item>
    </themed-list>
  </v-menu>
</template>

<style scoped>
  .v-list-item-title,
  .item {
    width: 100%;
    text-align: right;
    text-decoration: none;
    color: inherit;
  }
</style>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { GetTheme } from '@/types/theme';
import userStore from '@/stores/user';
import ThemedList from '@/components/themed/ThemedList.vue';

export default defineComponent({
  name: 'profile-btn',
  components: { ThemedList },
  setup() {
    const user = userStore();
    const isDark: GetTheme = inject('isThemeDark') || (() => false);
    return { user, isDark };
  },
  computed: {
    picture(): string {
      const url = require.context('@/assets/icons/', false, /\.(png|jpe?g|svg)$/);
      return url(`./user_no_picture_${this.isDark() ? 'dark' : 'light'}.svg`);
    },
  },
});
</script>
