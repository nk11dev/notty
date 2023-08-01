import { MigrationInterface } from 'typeorm';

import { UserRole } from '@/common/constants/auth.constants';

import AuthService from '@/server/services/auth.service';
import UsersService from '@/server/services/users.service';

export class SeedAdminUser1690929046678 implements MigrationInterface {
  name = 'SeedAdminUser1690929046678'

  public async up(): Promise<void> {
    const [username, email, password] = (process.env.ADMIN_USER_CREDENTIALS as string).split('|');

    const hashedPassword = await AuthService.hash(password);

    await UsersService.createUser({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: UserRole.ADMIN,
    });
  }

  public async down(): Promise<void> {
    // do nothing
  }

}
