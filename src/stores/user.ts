import { defineStore } from 'pinia';
import { User, Notifications } from '@/types/user';

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
    getNotificationsCount(): number {
      return TMPNotifications.length; // TODO: use API here
    },
    getNotifications(): Notifications {
      // TODO: use API here
      return TMPNotifications;
    },
    isUserLoggedIn(): boolean {
      // retrieve token from local storage
      this.token = localStorage.getItem('AE_UTBM_CONNEXION_TOKEN') || null;
      return !!this.token;
    },
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
});
