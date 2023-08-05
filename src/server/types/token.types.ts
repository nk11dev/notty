import { UserRole } from '@/common/constants';

export type AccessTokenPayload = {
  id: number;
  role: UserRole;
  iat: number;
  exp: number;
}

export type RefreshTokenPayload = {
  id: number;
  iat: number;
  exp: number;
}