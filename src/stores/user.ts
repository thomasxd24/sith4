import { defineStore } from 'pinia';

interface User {
  id: number | null;
  name: string;
  lastname: string;
  username: string
  nickname: string;
  email: string;
  token: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const defaultUser: User = {
  id: null,
  name: '',
  lastname: '',
  username: '',
  nickname: '',
  email: '',
  token: '',
};

const defaultUserDev: User = {
  id: 0,
  name: 'Julien',
  lastname: 'Constant',
  username: 'Juknum',
  nickname: 'Tinople',
  email: 'test@utbm.fr',
  token: 'il_est_bo_hein',
};

export default defineStore('user', {
  // state: () => defaultUser,
  state: () => defaultUserDev,
  actions: {
    getNotificationsCount(): number {
      return 0; // TODO: use API here
    },
    isUserLoggedIn(): boolean {
      return !!this.token;
    },
    logout(): void {
      this.token = null;
    },
  },
});
