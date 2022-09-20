<template>
  <v-img :src="user.banner" class="banner" height="268" cover/>
  <v-row class="content">
    <v-col :cols="$vuetify.display.width > 1300 ? 3 : 12">
      <v-card class="card card-info" :color="theme.isDark ? 'secondary' : 'tertiary'">
        <div class="profile-info">
          <div class="picture-and-promo">
            <v-img
              class="picture elevated"
              :src="user.picture"
              :width="pictureSize"
              :height="pictureSize"
              aspect-ratio="1"
              cover
            />
            <v-img
              class="promo elevated"
              :src="user.promoLogo"
              :width="promoSize"
              :height="promoSize"
              aspect-ratio="1"
              cover
            />
          </div>

          <div class="info">
            <h2 class="name">{{ user.firstName }}&nbsp;{{ user.lastName }}</h2>
            <h3 class="nickname">{{ user.nickName }}</h3>
            <h4 class="age">{{ $t('profile.display_age', { age }) }}</h4>
          </div>

          <div class="socials-edit-btn">
            <div class="socials-btn">
              <v-btn
                v-for="social in user.socials" :key="social.name"
                :href="social.link"
                flat
                icon
                color="transparent"
              ><v-img :src="getAsset(`./${social.name}.svg`)" height="32" width="32" /></v-btn>
            </div>

            <themed-btn class="edit-btn" color="var(--v-theme-white)">{{ $t('profile.edit_btn') }}</themed-btn>
          </div>
        </div>
      </v-card>
    </v-col>
    <v-col :cols="$vuetify.display.width > 1300 ? 9 : 12" class="content-main">
      <v-card class="card" :color="theme.isDark ? 'secondary' : 'tertiary'">
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

.content {
  padding: 0 20px;

  @media (max-width: 1300px) {
    gap: 9px;
    padding: 20px 0;
  }

  &-main {
    padding-top: 35px;

    @media (max-width: 1300px) {
      padding-top: 0;
    }
  }
}

.info {
  > * {
    text-align: center;

    @media (max-width: 1300px) {
      text-align: left;
    }
  }

  @media (max-width: 1300px) {
    margin-top: 10px;
    margin-right: auto;
  }
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

  &-info {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    overflow: visible;

    @media(max-width: 1300px)  {
      border-radius: 20px;
    }
  }
}

.profile-info {
  padding-top: 170px;
  display: flex;
  flex-direction: column;
  align-content: center;
  gap: 20px;

  @media(max-width: 1300px)  {
    padding-top: 0;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: start;
  }
}

.socials-btn {
  @media (max-width: 1300px) {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
}

.socials-edit-btn  {
  display: flex;
  flex-direction: column;
  align-content: center;
  gap: 20px;

  @media(max-width: 1300px)  {
    justify-content: space-between;
    align-items: flex-end;
  }

  @media (max-width: 600px) {
    width: 100%;
    align-items: center;
  }
}

.picture-and-promo {
  position: absolute;
  left: 9.5px;
  top: -100px;
  border-radius: 50%;

  @media(max-width: 1300px)  {
    position: relative;
    left: auto;
    top: auto;
  }

  > .picture {
    max-height: 265px;
    max-width: 265px;
    height: 100%;
    width: 100%;
    border-radius: 50%;
  }

  > .promo {
    position: absolute;
    border-radius: 50%;
    bottom: 0;
    right: 0;
  }
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
    pictureSize(): number {
      if (this.$vuetify.display.smAndDown) return 120;
      return this.$vuetify.display.width > 1300 ? 265 : 160;
    },
    promoSize(): number {
      if (this.$vuetify.display.smAndDown) return 50;
      return this.$vuetify.display.width > 1300 ? 96 : 60;
    },
  },
  mounted() {
    if (!this.user.isLoggedIn()) {
      this.errorHandler.show(this.$t('errors.must_be_logged_in'), { color: 'danger' });
      this.$router.push({ name: 'login' });
    }
  },
  methods: {
    getAsset(path: string) {
      const url = require.context('@/assets/socials/', false, /\.(png|jpe?g|svg)$/);
      return url(path);
    },
  },
});

</script>
