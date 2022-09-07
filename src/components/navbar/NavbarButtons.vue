<template>
  <div class="buttons">
    <v-btn v-if="isConnected" size="small" icon="mdi-magnify" height="28" width="28"></v-btn>

    <translate-btn />
    <theme-btn />
    <profile-btn v-if="isConnected" />

    <div class="what_a_name_for_a_class">
      <!-- TODO: Use a real page that ask the API here -->
      <localize-btn size="small" v-if="!isConnected" v-on:click="user.login('123')">{{ $t("navbar_sign_in") }}</localize-btn>
      <localize-btn size="small" v-if="!isConnected">{{ $t("navbar_sign_up") }}</localize-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .buttons {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .what_a_name_for_a_class {
    display: flex;
    gap: 0px;
  }
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import LocalizeBtn from '@/components/localized/LocalizeBtn.vue';
import TranslateBtn from '@/components/buttons/TranslateBtn.vue';
import ThemeBtn from '@/components/buttons/ThemeBtn.vue';
import ProfileBtn from '@/components/buttons/ProfileBtn.vue';
import userStore from '@/stores/user';

export default defineComponent({
  name: 'navbar-buttons',
  components: {
    LocalizeBtn,
    TranslateBtn,
    ProfileBtn,
    ThemeBtn,
  },
  props: {
    isConnected: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    const user = userStore();
    return { user };
  },
});
</script>
