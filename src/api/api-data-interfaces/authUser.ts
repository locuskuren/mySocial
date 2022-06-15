import { User } from './index';

export interface AuthUser {
  token: string;
  user: User;
}
