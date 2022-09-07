export interface User {
  id: number | null;
  username: string;
  picture: string | null;
  token: string | null;
}

export interface Notification {
  timestamp: number;
  location?: string;
  read: boolean;
  name: string;
}
export type Notifications = Array<Notification>
