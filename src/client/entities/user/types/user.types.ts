import { UserRole } from '@/common/constants/auth.constants';

export type UserDto = {
  id: number,
  email: string,
  username: string,
  role: UserRole,
};

export type UserState = {
  data: UserDto | null,
  error: unknown,
  isAuthenticated: boolean,
  isUpdating: boolean,
  isError: boolean,
}