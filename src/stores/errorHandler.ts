import axios, { AxiosError } from 'axios';
import { defineStore } from 'pinia';

export interface APIError {
  message: Array<string> | string;
  statusCode: number;
  error: Error;
}

export default defineStore('errorHandler', {
  state: () => ({
    displayed: false,
    message: '',
    color: 'error',
    timeout: 4000,
  }),
  actions: {
    show(message: string, options?: { stack?: Error, color?: string, timeout?: number }) {
      this.message = message;
      if (options) {
        this.color = options.color || '#222';
        this.timeout = options.timeout || 4000;
        if (options.stack) console.error(options.stack);
      }

      this.displayed = true;
    },
    axiosError(error: Error | AxiosError<APIError>) {
      if (axios.isAxiosError(error)) {
        const title = `${(error.response?.data as APIError).statusCode} - ${(error.response?.data as APIError)?.error ?? (error.response?.data as APIError)?.message}`;

        this.show(title, {
          stack: error,
          color: 'error',
        });
      } else {
        this.show(error.message, { stack: error, color: 'error' });
      }
    },
  },
});
