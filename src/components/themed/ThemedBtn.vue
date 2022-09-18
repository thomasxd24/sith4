<template>
  <localized-btn v-bind="$attrs" class="themed-btn" :style="{ '--color': color }">
    <slot />
  </localized-btn>
</template>

<style lang="scss" scoped>
.themed-btn {
  --color: '#fff';
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;

  min-width: 110px;
  text-align: center;
  padding: 5px 30px;
  color: rgba(var(--color), 1);
  border: 1px solid rgba(var(--color), 1);
  border-radius: 50px;
  background-color: transparent;
}

.themed-btn:hover {
  cursor: pointer;
  color: black;
  background-color: rgba(var(--color), 1);
}

.themed-btn:active {
  background-color: rgba(var(--color), 0.5);
}

.themed-btn[disabled],
.themed-btn[disabled]:hover {
  cursor: not-allowed;
  background-color: transparent;
  color: rgba(var(--color), 1);
  opacity: 0.5;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import LocalizedBtn from '@/components/localized/LocalizedBtn.vue';

export default defineComponent({
  name: 'themed-btn',
  components: {
    LocalizedBtn,
  },
  props: {
    color: {
      type: String,
      required: false,
      default: '255,255,255,.5',
    },
  },
});
</script>
