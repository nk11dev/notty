import dataSource from '@/server/orm/datasource';
import UserEntity from '@/server/orm/entities/user.entity';
import type { UserPayload } from '@/server/types/user.types';

const userRepository = dataSource.getRepository(UserEntity);

export default class UsersService {

  static async getAllUsers() {
    return await userRepository
      .createQueryBuilder()
      .orderBy('id', 'ASC')
      .getMany();
  }

  static async getOneUser(id: number) {
    return await userRepository.findOneBy({ id });
  }

  static async createUser(payload: UserPayload) {
    const { raw: [result] } = await userRepository
      .createQueryBuilder()
      .insert()
      .values(payload)
      .returning('*')
      .execute();

    return result;
  }

  static async updateUser(id: number, payload: UserPayload) {
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

  static async deleteUser(id: number) {
    return await userRepository.manager.query(`
      DELETE 
      FROM ${userRepository.metadata.tableName} 
      WHERE id = $1
      RETURNING *
    `, [id]);
  }
}