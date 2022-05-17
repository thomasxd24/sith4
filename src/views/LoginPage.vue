<template>
<v-card>
  <v-card-title class="justify-center">
    {{ $t(`login_page.titles.${type}`) }}
  </v-card-title>
  <v-card-text>
    <v-form
      v-model="validForm"
      lazy-validation
    >
      <v-text-field
        v-model="form.login"
        :rules="rules.login"
        label="Email"
        hide-details
        prepend-icon="mdi-account-circle"
      ></v-text-field>
      <v-text-field
        v-model="form.password"
        :rules="rules.password"
        label="Password"
        hide-details
        :prepend-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        @click:prepend="showPassword = !showPassword"
      ></v-text-field>
    </v-form>
  </v-card-text>
  <v-card-actions class="justify-center">
    <v-btn class="bg-tertiary" @click="''">{{ $t('buttons.go_back') }}</v-btn>
    <v-btn class="bg-secondary" @click="''">{{ $t('buttons.submit') }}</v-btn>
  </v-card-actions>
</v-card>
</template>

<style lang="scss">
.v-card {
  max-width: 500px;
  width: 100%;
  margin: auto auto;
  padding-bottom: 10px;
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

<script lang="ts">
import { defineComponent } from 'vue';
import documentStore from '@/stores/document';

interface Data {
  type: 'sign-in' | 'sign-up';
  form: { login: string; password: string };
  rules: {
    login: Array<(input: string) => string | true>;
    password: Array<(input: string) => string | true>;
  },
  showPassword: boolean;
}

export default defineComponent({
  name: 'LoginPage',
  data() {
    const data: Data = {
      type: 'sign-in',
      form: {
        login: '',
        password: '',
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
      },
      showPassword: false,
    };

    return data;
  },
  setup() {
    const doc = documentStore();
    return { doc };
  },
  computed: {
    validForm() {
      return true;
    },
  },
  mounted() {
    this.type = this.$router.currentRoute.value.name as Data['type'];
    this.doc.setPageTitle(this.$t(`login_page.titles.${this.type}`));
  },
});
</script>
