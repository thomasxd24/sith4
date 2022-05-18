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

interface Notification {
  timestamp: number;
  location?: string;
  read: boolean;
  name: string;
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    getNotifications(): Array<Notification> {
      return [
        {
          read: false,
          timestamp: new Date().getTime(),
          location: 'Foyer',
          name: 'Vous avez achetez 1x Soft',
        },
        {
          read: false,
          timestamp: new Date().getTime(),
          location: 'MDE',
          name: 'Vous avez achetez 1x Lustucru - Pastabox Formule',
        },
        {
          read: true,
          timestamp: new Date().getTime(),
          name: 'Vous avez achetez rechargez votre compte de 10€',
        },
      ];
    },
    isUserLoggedIn(): boolean {
      return !!this.token;
    },
    logout(): void {
      this.token = null;
    },
  },
});
