import { sqlDateTranformer } from '@/server/helpers/orm.helpers';
import dataSource from '@/server/orm/datasource';
import UserEntity from '@/server/orm/entities/user.entity';
import type {
  UserCreatePayload,
  UserUpdatePayload,
} from '@/server/types/user.types';

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
      .select(['u.id', 'u.email', 'u.username'])
      .where('u.id = :id', { id })
      .getOne();
  }

  static async findUserById(id: number) {
    return await userRepository.findOneBy({ id });
  }

  static async findUserByEmail(email: string) {
    return await userRepository.findOneBy({ email });
  }

  static async createUser(payload: UserCreatePayload) {
    const { raw: [result] } = await userRepository
      .createQueryBuilder()
      .insert()
      .values(payload)
      .returning(['id', 'email', 'username'])
      .execute();

    return result;
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

  static async updateUserLastLoginAt(id: number) {
    const [affectedRows] = await userRepository.manager.query(`
      UPDATE ${userRepository.metadata.tableName}
      SET 
        last_login_at = CURRENT_TIMESTAMP,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING 
        id, email, username, 
        ${sqlDateTranformer('last_login_at')}
    `, [id]);

    return affectedRows[0];
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