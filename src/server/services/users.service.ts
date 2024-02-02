import type {
  UserCreatePayload,
  UserUpdatePayload,
} from '@/common/types/user.types';

import dataSource from '@/server/orm/datasource';
import UserEntity from '@/server/orm/entities/user.entity';

const userRepository = dataSource.getRepository(UserEntity);

export default {

  getAllUsers: async () => {
    return await userRepository
      .createQueryBuilder()
      .orderBy('created_at', 'ASC')
      .getMany();
  },

  getUserProfile: async (id: string) => {
    return await userRepository
      .createQueryBuilder('u')
      .select(['u.id', 'u.email', 'u.username', 'u.role'])
      .where('u.id = :id', { id })
      .take(1)
      .getOne();
  },

  findUserById: async (id: string) => {
    return await userRepository.findOneBy({ id });
  },

  findUserByEmail: async (email: string) => {
    return await userRepository.findOneBy({ email });
  },

  createUser: async (payload: UserCreatePayload) => {
    const { raw: [{ id, email, username, role }] } = await userRepository
      .createQueryBuilder()
      .insert()
      .values(payload)
      .returning('*')
      .execute();

    return { id, email, username, role };
  },

  updateUserData: async (id: string, payload: UserUpdatePayload) => {
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
  },

  updateUserLastLoginAt: async (userId: string) => {
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
  },

  deleteUser: async (id: string) => {
    return await userRepository.manager.query(`
      DELETE 
      FROM ${userRepository.metadata.tableName} 
      WHERE id = $1
      RETURNING *
    `, [id]);
  }
};