<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" size="small" icon height="28" width="28" >
        <v-img :src="user.picture" height="28" width="28" />
      </v-btn>
    </template>

    <themed-list :class="$vuetify.display.smAndUp ? '' : 'full'">
      <v-list-item @click="() => ''">
        <v-list-item-title>
          <localized-link to="profile" style="" class="item">{{ $t('user_profile') }}</localized-link>
        </v-list-item-title>
      </v-list-item>

      <v-list-item @click="() => ''">
        <v-list-item-title class="item">{{ $t('user_notifications') }}</v-list-item-title>
      </v-list-item>

      <v-list-item @click="logout()">
        <v-list-item-title class="item __color_danger">{{ $t('user_logout') }}</v-list-item-title>
      </v-list-item>
    </themed-list>
  </v-menu>
</template>

<style lang="scss" scoped>
.v-list-item-title,
.item {
  width: 100%;
  text-align: right;
  text-decoration: none;
  color: inherit;
}

.full {
  top: 15px;
  left: -12px;
  z-index: 1;
  width: calc(100vw);
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import userStore from '@/stores/user';
import themeStore from '@/stores/theme';
import ThemedList from '@/components/themed/ThemedList.vue';

export default defineComponent({
  name: 'profile-btn',
  components: { ThemedList },
  setup() {
    return {
      user: userStore(),
      theme: themeStore(),
    };
  },
  methods: {
    logout() {
      this.user.logout();
      this.$router.push({ name: 'home' });
    },
  },
});
</script>
