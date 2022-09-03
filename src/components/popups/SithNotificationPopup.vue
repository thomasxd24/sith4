<template>
  <v-dialog
    v-model="show"
    max-width="500px"
  >
    <v-card>
      <v-card-title class="justify-center">{{ $t("notifications") }}</v-card-title>
      <v-list>
        <v-list-item
          v-for="(notification, index) in user.getNotifications()"
          :key="index"
        >
          <v-list-item-content :disabled="notification.read">
            <v-list-item-title>{{ notification.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ $d(notification.timestamp) }}&nbsp;{{ notification.location ?? '' }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-card-actions class="justify-center">
        <sith-btn-localized class="bg-secondary" :to="'/profile/' + user.username  + '/notifications'">{{ $t("buttons.see_all") }}</sith-btn-localized>
        <v-btn class="bg-tertiary">{{ $t("buttons.mark_as_read") }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="scss">
v-list-item-content[disabled=true] {
  color: lightgray;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import userStore from '@/stores/user';
import SithBtnLocalized from '../SithBtnLocalized.vue';

export default defineComponent({
  name: 'sith-notification-popup',
  components: {
    SithBtnLocalized,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const user = userStore();
    return { user };
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value: boolean) {
        this.$emit('input', value);
      },
    },
  },
});

</script>
