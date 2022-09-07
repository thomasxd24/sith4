<template>
  <div class="place">
    <v-badge class="place-dot" dot inline :color="statusColor(status)" />
    <p class="place-name">{{ place }}</p>
  </div>
</template>

<style lang="scss" scoped>
  .place {
    display: flex;
    align-items: center;
  }

  .place-dot {
    display: flex;
    align-items: center;
    height: 22px;
  }

  .place-name {
    margin-left: 10px;
    margin-right: 10px;

    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
  }
</style>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'navbar-place',
  props: {
    place: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  methods: {
    statusColor(status: string) {
      switch (status) {
        case 'online':
          return '#7CE38B';
        case 'offline':
          return '#FF1A0A';
        default:
          return '#FAA356';
      }
    },
  },
});
</script>
