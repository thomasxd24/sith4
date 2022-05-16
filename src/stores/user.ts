import { defineStore } from 'pinia';

export default defineStore('user', {
  state: () => ({
    name: 'Julien',
    lastname: 'Constant',
    username: 'juknum',
    nickname: 'Tinople',
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
