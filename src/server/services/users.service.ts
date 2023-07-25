import dataSource from '@/server/orm/datasource';
import UserEntity from '@/server/orm/entities/user.entity';
import type {
  UserCreatePayload,
  UserUpdatePayload,
} from '@/common/types/user.types';

const userRepository = dataSource.getRepository(UserEntity);

export default class UsersService {

  static async getAllUsers() {
    return await userRepository
      .createQueryBuilder()
      .orderBy('id', 'ASC')
      .getMany();
  }

  static async getUserProfile(id: number) {
    return await userRepository
      .createQueryBuilder('u')
      .select(['u.id', 'u.email', 'u.username', 'u.role'])
      .where('u.id = :id', { id })
      .take(1)
      .getOne();
  }

  static async findUserById(id: number) {
    return await userRepository.findOneBy({ id });
  }

  static async findUserByEmail(email: string) {
    return await userRepository.findOneBy({ email });
  }

  static async createUser(payload: UserCreatePayload) {
    const { raw: [{ id, email, username, role }] } = await userRepository
      .createQueryBuilder()
      .insert()
      .values(payload)
      .returning('*')
      .execute();

    return { id, email, username, role };
  }

  static async updateUserData(id: number, payload: UserUpdatePayload) {
    return await userRepository
      .createQueryBuilder()
      .update()
      .set({
        ...payload,
        updated_at: new Date(),
      })
      .where('id = :id', { id })
      .returning('*')
      .execute();
  }

  static async updateUserLastLoginAt(userId: number) {
    const { raw: [{ id, email, username, role }] } = await userRepository
      .createQueryBuilder()
      .update()
      .set({
        last_login_at: new Date(),
        updated_at: new Date(),
      })
      .where('id = :userId', { userId })
      .returning('*')
      .execute();

    return { id, email, username, role };
  }

  static async deleteUser(id: number) {
    return await userRepository.manager.query(`
      DELETE 
      FROM ${userRepository.metadata.tableName} 
      WHERE id = $1
      RETURNING *
    `, [id]);
  }
}