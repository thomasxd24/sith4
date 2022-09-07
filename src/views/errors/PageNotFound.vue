<template>
  <main>
    <div>
      <h1>{{ $t("errors.page.not_found.title") }}</h1>
      <p align="justify">{{ $t("errors.page.not_found.description") }}</p>
    </div>
  </main>
</template>

<style lang="scss" scoped>
  $max-width: 500px;

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    gap: 20px;
    padding-top: 30px;
  }

  .gif {
    width: 100%;
    max-width: $max-width;
    max-height: 200px;
  }
</style>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageNotFoundView',
});
</script>
