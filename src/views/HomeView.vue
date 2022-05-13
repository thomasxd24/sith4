<template>
  <sith-main-navbar />
  {{ $t("home.message") }}
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SithMainNavbar from '@/components/SithMainNavbar.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    SithMainNavbar,
  },
});
</script>
