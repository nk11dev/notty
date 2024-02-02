import { UserRole } from '@/common/constants';

export type AccessTokenPayload = {
  id: string;
  role: UserRole;
  iat: number;
  exp: number;
}

export type RefreshTokenPayload = {
  id: string;
  iat: number;
  exp: number;
}