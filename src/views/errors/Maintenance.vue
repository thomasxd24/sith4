<template>
  <sith-language-popup v-model="showLanguagePopup" />

  <main>
    <v-img class="gif" :src="getGIF" />
    <div>
      <h1>{{ $t("errors.page.maintenance.title") }}</h1>
      <p align="justify">
        {{ $t("errors.page.maintenance.description_1") }}
        <br />
        {{ $t("errors.page.maintenance.description_2", { email: 'ae.info@utbm.fr' }) }}
        <br />
        <br />
        {{ $t("errors.page.maintenance.description_3") }}
      </p>
      <br />
      <p>&mdash;&nbsp;{{ $t("team_name") }}</p>
    </div>

    <v-btn @click="showLanguagePopup = true" icon="mdi-translate"></v-btn>
  </main>
</template>

<style lang="scss" scoped>
  $max-width: 500px;

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: 20px;
    padding: 30px;
    margin: 0 auto;
  }
  .gif {
    width: 100%;
    max-width: $max-width;
    max-height: 200px;
  }
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import SithLanguagePopup from '@/components/popups/SithLanguagePopup.vue';

export default defineComponent({
  name: 'MaintenanceView',
  components: {
    SithLanguagePopup,
  },
  data() {
    return {
      showLanguagePopup: false,
      GIFs: [
        'https://c.tenor.com/fKIG2kiLVPgAAAAC/this-is-fine-its-fine.gif',
        'https://c.tenor.com/8rQnI1xDiEIAAAAC/michael-scott-the-office.gif',
        'https://c.tenor.com/yMtzIUk9ab4AAAAC/orson-welles-welles.gif',
        'https://c.tenor.com/CPCWqIdV9XwAAAAC/hide-the-pain-harold-harold.gif',
        'https://c.tenor.com/okE5HOSAIyAAAAAC/akhtar-th%E1%BA%A5t.gif',
      ],
    };
  },
  computed: {
    getGIF(): string {
      return this.GIFs[Math.floor(Math.random() * this.GIFs.length)];
    },
  },
});
</script>
