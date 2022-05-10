<template>
  <div class="home">
    <HelloI18n />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloI18n from "@/components/HelloI18n.vue"; // @ is an alias to /src

export default defineComponent({
  name: "HomeView",
  components: {
    HelloI18n,
  },
});
</script>
