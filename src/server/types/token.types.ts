import { UserRole } from '@/common/constants';

export type TokenData = {
  id: number;
  email: string;
  username: string;
  role: UserRole;
  iat: number;
  exp: number;
}