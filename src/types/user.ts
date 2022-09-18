export interface User {
  uuid: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  nickName: string | null;
  gender: string | null;
  pronouns: string | null;
  phoneNumber: string | null;
  emergencyPhoneNumber: string | null;
  studentAddress: string | null;
  parentAddress: string | null;
  school: string | null;
  department: string | null;
  promotion: number | null;
  permissions: number;
  verified: boolean;
  createdAt: Date;
  lastLogin: Date | null;
  organizationId: number | null;
}

export interface UserAuth {
  token: string | null;
  refreshToken: string | null;
}

export interface Notification {
  timestamp: number;
  location?: string;
  read: boolean;
  name: string;
}
export type Notifications = Array<Notification>
