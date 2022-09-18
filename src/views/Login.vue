// TODO: Add authentification trough other websites (Facebook, Google, Twitter, etc.)

<template>
  <div class="container">
    <h2>{{ $t('connexion.login.title') }}</h2>
    <v-form v-model="valid" ref="form" class="form" lazy-validation>
      <v-text-field
        :label="`${$t('connexion.username')}/${$t('connexion.email')}`"
        :bg-color="theme.isDark ? 'tertiary' : 'light_gray'"
        required
        variant="solo"
        v-model="form.email_or_username"
        :rules="rules.email_or_username"
        prepend-inner-icon="mdi-account"
      />
      <v-text-field
        :label="$t('connexion.password')"
        :bg-color="theme.isDark ? 'tertiary' : 'light_gray'"
        required
        variant="solo"
        v-model="form.password"
        :rules="rules.password"
        :prepend-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        @click:prepend-inner="showPassword = !showPassword"
      />
    </v-form>
    <div class="btn">
      <themed-btn color="var(--v-theme-danger)" @click="$router.go(-1)">{{ $t('buttons.go_back') }}</themed-btn>
      <themed-btn color="var(--v-theme-success)" :disabled="!valid"  @click="validate" >{{ $t('buttons.submit') }}</themed-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
  min-height: 70vh;
}

.form {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.btn {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px
}
</style>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import ThemedBtn from '@/components/themed/ThemedBtn.vue';
import errorHandlerStore from '@/stores/errorHandler';
import userStore from '@/stores/user';
import themeStore from '@/stores/theme';

import axios from 'axios';
import localizePath from '@/utils/i18n/localizePath';

export default defineComponent({
  name: 'LoginView',
  components: { ThemedBtn },
  setup() {
    const apiURL: string = inject('apiURL') || '';

    return {
      apiURL,
      theme: themeStore(),
      errorHandler: errorHandlerStore(),
      user: userStore(),
    };
  },
  data() {
    return {
      valid: false,
      showPassword: false,
      form: {
        email_or_username: '',
        password: '',
      },
      rules: {
        email_or_username: [
          (v: string) => !!v || this.$t('connexion.rules.required', { field: `${this.$t('connexion.username').toLowerCase()}/${this.$t('connexion.email').toLowerCase()}` }),
        ],
        password: [
          (v: string) => !!v || this.$t('connexion.rules.required', { field: this.$t('connexion.password').toLowerCase() }),
        ],
      },
    };
  },
  mounted() {
    if (this.user.isLoggedIn) {
      this.$router.push(localizePath('/profile', this.$i18n.locale, this.$route.path, this.$router));
      this.errorHandler.show(this.$t('errors.already_logged_in'), { color: 'error' });
    }
  },
  methods: {
    validate() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this.$refs.form as any).validate();

      const data: {[key: string]: null | string} = {
        email: null,
        username: null,
        password: this.form.password,
      };

      if (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.form.email_or_username)) {
        data.email = this.form.email_or_username;
      } else data.username = this.form.email_or_username;

      axios.post(`${this.apiURL}/auth/login`, data)
        .then((res) => {
          this.user.login(res.data.token);
          this.$router.push({ name: 'profile' });
        })
        .catch((err: Error) => this.errorHandler.axiosError(err));
    },
  },
});
</script>
