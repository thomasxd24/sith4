import { defineStore } from 'pinia';
import { User, Notifications } from '@/types/user';
import themeStore from './theme';

const user: User = {
  id: null,
  username: '',
  picture: null,
  token: null,
};

// TODO: for dev only, replace this with an API call
const TMPNotifications: Notifications = [
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

export default defineStore('user', {
  state: () => user,
  actions: {
    login(token: string): void {
      this.token = token;
      localStorage.setItem('AE_UTBM_CONNEXION_TOKEN', token);
    },
    logout(): void {
      this.token = null;
      localStorage.setItem('AE_UTBM_CONNEXION_TOKEN', '');
      this.$dispose(); // TODO: is this needed?
    },
  },
  getters: {
    notificationsCount(): number {
      return TMPNotifications.length; // TODO: use API here
    },
    notifications(): Notifications {
      // TODO: use API here
      return TMPNotifications;
    },
    isLoggedIn(): boolean {
      // retrieve token from local storage
      this.token = localStorage.getItem('AE_UTBM_CONNEXION_TOKEN') || null;
      return !!this.token;
    },
    picture(): string {
      if (user.picture !== null) return user.picture;

      const theme = themeStore();
      const url = require.context('@/assets/icons/', false, /\.(png|jpe?g|svg)$/);
      return url(`./user_no_picture_${theme.dark ? 'dark' : 'light'}.svg`);
    },
  },
});
