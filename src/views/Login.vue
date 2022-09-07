<template>
  <div class="main">
    <v-row class="title">
      <v-col class="logo">
        <v-img alt="logo" src="@/assets/logo/ae_base.png" />
      </v-col>
      <v-col class="text">
        <span>Association des Étudiants</span>
        <span>De l'Université de Technologie de Belfort-Montbéliard</span>
      </v-col>
    </v-row>
    <v-card>
      <v-card-title class="justify-center">
        {{ $t(`login_page.titles.${type}`) }}
      </v-card-title>
      <v-card-text>
        <v-form v-model="validForm" lazy-validation>
          <v-text-field
            label="Email"
            hide-details
            clearable
            variant="outlined"
            v-model="form.login"
            :rules="rules.login"
            prepend-icon="mdi-account-circle"
          />
          <v-text-field
            label="Password"
            hide-details
            clearable
            variant="outlined"
            v-model="form.password"
            :rules="rules.password"
            :prepend-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:prepend="showPassword = !showPassword"
          />
          <v-text-field
            v-if="type === 'sign-up'"
            label="Password confirmation"
            hide-details
            clearable
            variant="outlined"
            v-model="form.confirmPassword"
            :rules="rules.confirmPassword"
            :prepend-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showConfirmPassword ? 'text' : 'password'"
            @click:prepend="showConfirmPassword = !showConfirmPassword"
          />
        </v-form>
      </v-card-text>
      <v-card-text v-if="type === 'sign-in'">
        <v-row class="justify-center mt-2 mb-2">
          <localized-link class="forgot_password" to="/password-reset">{{ $t('login_page.forgot_password') }}</localized-link>
        </v-row>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn class="bg-tertiary" @click="$router.go(-1)">{{ $t('buttons.go_back') }}</v-btn>
        <v-btn class="bg-secondary" @click="''">{{ $t('buttons.submit') }}</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<style lang="scss" scoped>
$max-width: 500px;

.forgot_password {
  color: inherit;
  margin-top: 10px;
  text-decoration: none;
}

.main {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.logo {
  width: 100px;
}

.title {
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: $max-width;
  flex: none;

  > * {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  > .logo {
    max-height: 100px;
    max-width: fit-content;

    > .v-img {
      width: 100px;
    }
  }

  > .text {
    > *:first-child {
      font-weight: 500;
    }

    > *:last-child {
      font-size: 0.75rem;
      text-transform: uppercase;
    }
  }
}

.v-card {
  max-width: $max-width;
  width: 100%;
  margin: 0 auto;
  padding: 18px 5px;

  &-text {
    padding: 0 20px;
  }

  &-title {
    text-transform: uppercase;
  }
}

.v-text-field {
  margin: 10px 0;
}
</style>

<style>
  .v-field__field {
    padding: 0;
    align-items: center;
  }
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import localizePath from '@/utils/i18n/localizePath';
import documentStore from '@/stores/document';
import userStore from '@/stores/user';
import errorHandlerStore from '@/stores/errorHandler';

interface Data {
  type: 'sign-in' | 'sign-up';
  form: {
    login: string;
    password: string;
    confirmPassword: string;
  };
  rules: {
    login: Array<(input: string) => string | true>;
    password: Array<(input: string) => string | true>;
    confirmPassword: Array<(input: string) => string | true>;
  },
  showPassword: boolean;
  showConfirmPassword: boolean;
}

export default defineComponent({
  name: 'LoginPage',
  data() {
    const data: Data = {
      type: 'sign-in',
      form: {
        login: '',
        password: '',
        confirmPassword: '',
      },
      rules: {
        login: [
          (input: string) => !!input || 'The login is required',
          (input: string) => /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(input) || 'Login must be an email',
        ],
        password: [
          (input: string) => !!input || 'The password is required',
          (input: string) => input.length >= 6 || 'The password must be at least 6 characters',
        ],
        confirmPassword: [
          (input: string) => !!input || 'The password is required',
          (input: string) => this.checkPasswords(input) || 'The passwords do not match',
        ],
      },
      showPassword: false,
      showConfirmPassword: false,
    };

    return data;
  },
  setup() {
    const doc = documentStore();
    const user = userStore();
    const errorHandler = errorHandlerStore();
    return { doc, user, errorHandler };
  },
  computed: {
    validForm() {
      return true;
    },
  },
  mounted() {
    if (this.user.isUserLoggedIn()) {
      this.$router.push(localizePath(`/profile/${this.user.username.toLowerCase()}`, this.$i18n.locale, this.$route.path, this.$router));
      this.errorHandler.show('You are already logged in', { color: 'error' });
    }

    this.type = this.$router.currentRoute.value.name as Data['type'];
    this.doc.setPageTitle(this.$t(`login_page.titles.${this.type}`));
  },
  methods: {
    checkPasswords(input: string) {
      return this.form.password === input;
    },
  },
});
</script>
