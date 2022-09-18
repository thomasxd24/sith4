// TODO: Add authentification trough other websites (Facebook, Google, Twitter, etc.)

<template>
  <div class="container">
    <h2>{{ $t('connexion.register.title') }}</h2>
    <template v-if="!submitted">
      <v-form v-model="valid" ref="form" class="form" lazy-validation>
        <v-text-field
          :label="$t('connexion.username')"
          :bg-color="isDark() ? 'tertiary' : 'light_gray'"
          required
          variant="solo"
          v-model="form.username"
          :rules="rules.username"
          prepend-inner-icon="mdi-account"
        />
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              :label="$t('connexion.register.first_name')"
              :bg-color="isDark() ? 'tertiary' : 'light_gray'"
              required
              variant="solo"
              v-model="form.first_name"
              :rules="rules.first_name"
              prepend-inner-icon="mdi-format-color-text"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              :label="$t('connexion.register.last_name')"
              :bg-color="isDark() ? 'tertiary' : 'light_gray'"
              required
              variant="solo"
              v-model="form.last_name"
              :rules="rules.last_name"
            />
          </v-col>
        </v-row>
        <v-text-field
          :label="$t('connexion.register.birth_date')"
          :bg-color="isDark() ? 'tertiary' : 'light_gray'"
          class="datepicker"
          type="date"
          required
          variant="solo"
          v-model="form.birth_date"
          :rules="rules.birth_date"
          prepend-inner-icon="mdi-cake-variant"
        />

        <v-text-field
          :label="$t('connexion.email')"
          :bg-color="isDark() ? 'tertiary' : 'light_gray'"
          required
          variant="solo"
          v-model="form.email"
          :rules="rules.email"
          prepend-inner-icon="mdi-at"
        />
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              :label="$t('connexion.password')"
              :bg-color="isDark() ? 'tertiary' : 'light_gray'"
              required
              variant="solo"
              v-model="form.password"
              :rules="rules.password"
              :prepend-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:prepend-inner="showPassword = !showPassword"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              :label="$t('connexion.register.confirm_password')"
              :bg-color="isDark() ? 'tertiary' : 'light_gray'"
              required
              variant="solo"
              v-model="form.confirmPassword"
              :rules="rules.confirmPassword"
              :type="showPassword ? 'text' : 'password'"
            />
          </v-col>
        </v-row>
      </v-form>
      <div class="btn">
        <themed-btn color="var(--v-theme-danger)" @click="$router.go(-1)">{{ $t('buttons.go_back') }}</themed-btn>
        <themed-btn color="var(--v-theme-success)" :disabled="!valid"  @click="validate" >{{ $t('buttons.submit') }}</themed-btn>
      </div>
    </template>
    <div v-else>
      <p align="center">{{ $t('connexion.register.confirmation.line_1') }}</p>
      <p align="center"><a :href="`mailto:${form.email}`">{{ form.email }}</a></p>
      <p align="center">{{ $t('connexion.register.confirmation.line_2') }}</p>
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
  max-width: 800px;
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
import localizePath from '@/utils/i18n/localizePath';
import ThemedBtn from '@/components/themed/ThemedBtn.vue';
import documentStore from '@/stores/document';
import userStore from '@/stores/user';
import errorHandlerStore from '@/stores/errorHandler';
import axios from 'axios';

type formKeys = 'first_name' | 'last_name' | 'username' | 'birth_date' | 'email' | 'password' | 'confirmPassword';

interface Data {
  valid: boolean;
  submitted: boolean;
  form: {
    [key in formKeys]: string;
  };
  rules: {
    [key in formKeys]: Array<(input: string) => string | true>
  },
  showPassword: boolean;
  showConfirmPassword: boolean;
}

export default defineComponent({
  name: 'RegisterView',
  components: { ThemedBtn },
  data() {
    const data: Data = {
      valid: true,
      submitted: false,
      form: {
        first_name: '',
        last_name: '',
        username: '',
        birth_date: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      rules: {
        first_name: [
          (input: string) => !!input || this.$t('connexion.rules.required', { field: this.$t('connexion.register.first_name').toLowerCase() }),
          (input: string) => (input.length >= 3 && input.length < 20) || this.$t('connexion.register.rules.first_name_invalid', { min: 3, max: 20 }),
        ],
        last_name: [
          (input: string) => !!input || this.$t('connexion.rules.required', { field: this.$t('connexion.register.last_name').toLowerCase() }),
          (input: string) => (input.length >= 3 && input.length < 30) || this.$t('connexion.register.rules.last_name_invalid', { min: 3, max: 30 }),
        ],
        username: [
          (input: string) => !!input || this.$t('connexion.rules.required', { field: this.$t('connexion.username').toLowerCase() }),
          (input: string) => (input.length >= 3 && input.length < 30) || this.$t('connexion.register.rules.username_invalid', { min: 3, max: 30 }),
          (input: string) => (input.replace(/\s/g, '').length === input.length) || this.$t('connexion.register.rules.no_whitespace', { field: this.$t('connexion.register.username').toLowerCase() }),
        ],
        birth_date: [
          (input: string) => !!input || this.$t('connexion.rules.required', { field: this.$t('connexion.register.birth_date').toLowerCase() }),
          (input: string) => {
            const inputDate = new Date(input);
            const todayDate = new Date();

            if (todayDate < inputDate) {
              return this.$t('connexion.register.rules.date.invalid');
            }

            if (todayDate.getFullYear() - inputDate.getFullYear() <= 16) {
              return this.$t('connexion.register.rules.date.year_invalid', { min: 16, max: 100 });
            }

            if (todayDate.getFullYear() - inputDate.getFullYear() > 100) {
              return this.$t('connexion.register.rules.date.year_invalid', { min: 16, max: 100 });
            }

            return true;
          },
        ],
        email: [
          (input: string) => !!input || this.$t('connexion.rules.required', { field: this.$t('connexion.register.email').toLowerCase() }),
          (input: string) => /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(input) || this.$t('connexion.register.rules.email_invalid'),
        ],
        password: [
          (input: string) => !!input || this.$t('connexion.rules.required', { field: this.$t('connexion.password').toLowerCase() }),
          (input: string) => input.length >= 8 || this.$t('connexion.register.rules.password_length', { n: 8 }),
        ],
        confirmPassword: [
          (input: string) => !!input || this.$t('connexion.rules.required', { field: this.$t('connexion.password').toLowerCase() }),
          (input: string) => this.checkPasswords(input) || this.$t('connexion.register.rules.password_mismatch'),
        ],
      },
      showPassword: false,
      showConfirmPassword: false,
    };
    return data;
  },
  setup() {
    const isDark: () => boolean = inject('isThemeDark') || (() => false);
    const apiURL: string = inject('apiURL') || '';

    return {
      doc: documentStore(),
      user: userStore(),
      errorHandler: errorHandlerStore(),
      isDark,
      apiURL,
    };
  },
  mounted() {
    if (this.user.isUserLoggedIn()) {
      this.$router.push(localizePath('/profile', this.$i18n.locale, this.$route.path, this.$router));
      this.errorHandler.show(this.$t('errors.already_logged_in'), { color: 'error' });
    }
  },
  methods: {
    checkPasswords(input: string) {
      return this.form.password === input;
    },
    validate() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this.$refs.form as any).validate();

      const data = {
        email: this.form.email,
        password: this.form.password,
        username: this.form.username,
        firstName: this.form.first_name,
        lastName: this.form.last_name,
        birthDate: new Date(this.form.birth_date),
      };

      axios.post(`${this.apiURL}/auth/register`, data)
        .then(() => {
          this.submitted = true;
        })
        .catch((err: Error) => this.errorHandler.axiosError(err));
    },
  },
});
</script>
