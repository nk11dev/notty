export type UserDto = {
  id: number,
  email: string,
  username: string,
  created_at?: string,
  last_login_at?: string | null,
};

export type UserState = {
  data: UserDto | null,
  error: unknown,
  isAuthenticated: boolean,
  isUpdating: boolean,
  isError: boolean,
}