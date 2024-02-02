import { MigrationInterface } from 'typeorm';

import { UserRole } from '@/common/constants';

import authService from '@/server/services/auth.service';
import usersService from '@/server/services/users.service';

export class SeedAdminUser1706831761226 implements MigrationInterface {
  name = 'SeedAdminUser1706831761226'

  public async up(): Promise<void> {
    const [username, email, password] = (process.env.MIGRATION_SEED_ADMIN_USER as string).split('|');

    const hashedPassword = await authService.hash(password);

    await usersService.createUser({
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
