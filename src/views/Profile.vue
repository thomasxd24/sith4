<template>
  <v-img :src="user.banner" class="banner" height="268" cover/>
  <v-row style="padding: 0 20px;">
    <v-col cols="3">
      <v-card class="card profile" color="secondary">
        <div class="picture-and-promo">
          <v-img class="picture" :src="user.picture" width="265" height="265" cover></v-img>
          <v-img class="promo" :src="user.promoLogo" width="96" height="96" cover></v-img>
        </div>

        <div>
          <h2 align="center" class="name">{{ user.firstName }}&nbsp;{{ user.lastName }}</h2>
          <h3 align="center" class="nickname">{{ user.nickName }}</h3>
          <h4 align="center" class="age">{{ $t('profile.display_age', { age }) }}</h4>
        </div>

        <themed-btn disabled class="edit-btn" color="var(--v-theme-white)">{{ $t('profile.edit_btn') }}</themed-btn>
      </v-card>
    </v-col>
    <v-col cols="9" style="padding-top: 30px">
      <v-card class="card" color="secondary">
        test
      </v-card>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
.banner {
  width: 100%;
  border-radius: 20px;
}

.name {
  font-size: 24px;
  font-weight: bold;
}
.age {
  font-size: 16px;
  font-weight: lighter;
  font-style: italic;
}

.nickname {
  font-size: 24px;
  font-weight: lighter;
}

.card {
  border-radius: 20px;
  padding: 20px;
}

.profile {
  padding-top: 200px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;

  display: flex;
  flex-direction: column;
  align-content: center;
  overflow: visible;
}

.picture-and-promo {
  z-index: 1;
  position: absolute;
  left: 9.5px;
  top: -100px;
  border-radius: 50%;

  > .picture {
    border-radius: 50%;
  }

  > .promo {
    position: absolute;
    border-radius: 50%;
    bottom: 0;
    right: 0;
  }
}

.edit-btn {
  margin-top: 20px;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import themeStore from '@/stores/theme';
import userStore from '@/stores/user';
import ThemedBtn from '@/components/themed/ThemedBtn.vue';
import errorHandlerStore from '@/stores/errorHandler';

export default defineComponent({
  components: { ThemedBtn },
  name: 'ProfileView',
  setup() {
    return {
      errorHandler: errorHandlerStore(),
      theme: themeStore(),
      user: userStore(),
    };
  },
  computed: {
    age(): number {
      const diff = Date.now() - new Date(this.user.birthDate).getTime();
      const ageDate = new Date(diff);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    },
  },
  mounted() {
    if (!this.user.isLoggedIn()) {
      this.errorHandler.show(this.$t('errors.must_be_logged_in'), { color: 'danger' });
      this.$router.push({ name: 'login' });
    }
  },
});

</script>
