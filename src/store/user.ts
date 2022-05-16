import { defineStore } from 'pinia';

export default defineStore('user', {
  state: () => ({
    name: '',
    lastname: '',
    username: '',
    nickname: '',
    token: '', // user token used for authentication (bearer token like)
  }),
  actions: {
    getNotificationsCount(): number {
      return 0; // TODO: use API here
    },
    isUserLoggedIn(): boolean {
      return !!this.token;
    },
  },
});
