export type UserDto = {
  id: number,
  email: string,
  username: string,
  created_at?: string,
  last_login_at?: string | null,
};