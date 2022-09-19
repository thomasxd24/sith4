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
    title: '',
    message: '',
    error: undefined as APIError | undefined as Error | undefined,
    color: 'danger',
    timeout: 4000,
  }),
  actions: {
    show(
      message: string,
      options?: { stack?: Error; color?: 'danger' | 'warning' | 'success'; timeout?: number },
    ) {
      this.message = message;
      this.error = options?.stack;

      if (options) {
        this.color = options.color || '#222';
        this.timeout = options.timeout || 4000;
        if (options.stack) console.error(options.stack);
      }

      this.displayed = true;
    },
    axiosError(error: Error | AxiosError<APIError>) {
      if (axios.isAxiosError(error)) {
        this.title = `${(error.response?.data as APIError).statusCode} - ${
          (error.response?.data as APIError)?.error ?? (error.response?.data as APIError)?.message
        }`;
        this.show(this.title, { stack: error, color: 'danger' });
      } else this.show(error.message, { stack: error, color: 'danger' });
    },
    async copyToClipBoard(): Promise<void> {
      await navigator.clipboard.writeText(`${this.message}\n${this.error ?? ''}`);
    },
  },
});
