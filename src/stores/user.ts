import { defineStore } from 'pinia';
import { User, UserAuth, Notifications } from '@/types/user';
import axios from 'axios';
import themeStore from './theme';
import errorStore from './errorHandler';

const user: User & UserAuth = {
  uuid: '',
  email: '',
  username: '',
  firstName: '',
  lastName: '',
  birthDate: new Date(),
  nickName: null,
  gender: null,
  pronouns: null,
  phoneNumber: null,
  emergencyPhoneNumber: null,
  studentAddress: null,
  parentAddress: null,
  school: null,
  department: null,
  promotion: null,
  permissions: 0,
  verified: false,
  createdAt: new Date(),
  lastLogin: null,
  organizationId: null,
  token: null,
  refreshToken: null,
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
    login(token: string, uuid: string): void {
      this.token = token;
      this.uuid = uuid;
      localStorage.setItem('AE_UTBM_CONNEXION_TOKEN', token);
      localStorage.setItem('AE_UTBM_CONNEXION_USER_UUID', uuid);
      this.fetchFromAPI();
    },
    logout(): void {
      this.token = null;
      localStorage.setItem('AE_UTBM_CONNEXION_TOKEN', '');
      localStorage.setItem('AE_UTBM_CONNEXION_USER_UUID', '');
      this.$dispose();
    },
    loadFromStorage(): void {
      this.token = localStorage.getItem('AE_UTBM_CONNEXION_TOKEN') || null;
      this.uuid = localStorage.getItem('AE_UTBM_CONNEXION_USER_UUID') || '';
      this.fetchFromAPI();
    },
    fetchFromAPI(): void {
      if (this.token && this.uuid) {
        const apiURL = process.env.VUE_APP_API_URL;
        const errorHandler = errorStore();

        axios
          .get(`${apiURL}/users/${this.uuid}`, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })
          .then((response) => {
            const { data }: { data: User } = response;

            this.uuid = data.uuid;
            this.email = data.email;
            this.username = data.username;
            this.firstName = data.firstName;
            this.lastName = data.lastName;
            this.birthDate = new Date(data.birthDate);
            this.nickName = data.nickName;
            this.gender = data.gender;
            this.pronouns = data.pronouns;
            this.phoneNumber = data.phoneNumber;
            this.emergencyPhoneNumber = data.emergencyPhoneNumber;
            this.studentAddress = data.studentAddress;
            this.parentAddress = data.parentAddress;
            this.school = data.school;
            this.department = data.department;
            this.promotion = data.promotion;
            this.permissions = data.permissions;
            this.verified = data.verified;
            this.createdAt = new Date(data.createdAt);
            this.lastLogin = data.lastLogin === null ? null : new Date(data.lastLogin);
          })
          .catch((error) => errorHandler.axiosError(error));
      } else this.logout();
    },
    isLoggedIn(): boolean {
      return !!this.token;
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
    picture(): string {
      // TODO: try to get picture from API first

      const theme = themeStore();
      const url = require.context('@/assets/icons/', false, /\.(png|jpe?g|svg)$/);
      return url(`./user_no_picture_${theme.dark ? 'dark' : 'light'}.svg`);
    },
  },
});
