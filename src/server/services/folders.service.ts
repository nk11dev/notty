import dataSource from '@/server/orm/datasource';
import FolderEntity from '@/server/orm/entities/folder.entity';
import type {
  FolderPayload
} from '@/server/types/folder.types';

const folderRepository = dataSource.getRepository(FolderEntity);

export default class FoldersService {

  static async getAllFolders(userIdCondition: number | null) {
    return await folderRepository
      .createQueryBuilder('f')
      .leftJoin('f.notes', 'n')
      .select([
        'f.id as id',
        'f.title as title',
        'f.user_id as user_id',
        'count(n.id)::int as notes_count'
      ])
      .andWhere(userIdCondition
        ? `f.user_id = :user_id`
        : '1=1', { user_id: userIdCondition }
      )
      .groupBy('f.id')
      .orderBy('f.id', 'ASC')
      .execute();
  }

  static async getFolder(id: number) {
    return await folderRepository
      .createQueryBuilder('f')
      .leftJoinAndSelect('f.notes', 'n')
      .orderBy('n.id', 'ASC')
      .where(`f.id = :id`, { id })
      .take(1)
      .getOne();
  }

  static async getLastFolder(userIdCondition: number | null) {
    return await folderRepository
      .createQueryBuilder()
      .orderBy('id', 'DESC')
      .andWhere(userIdCondition
        ? `user_id = :user_id`
        : '1=1', { user_id: userIdCondition }
      )
      .take(1)
      .getOne();
  }

  static async findFolder(id: number) {
    return await folderRepository.findOneBy({ id });
  }

  static async createFolder(payload: FolderPayload) {
    const { raw: [result] } = await folderRepository
      .createQueryBuilder()
      .insert()
      .values(payload)
      .returning('*')
      .execute();

    return result;
  }

  static async updateFolder(id: number, payload: FolderPayload) {
    const { title } = payload;

    return await folderRepository.manager.query(`
      UPDATE ${folderRepository.metadata.tableName}
      SET 
        title = $1,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `, [title, id]);
  }

  static async deleteFolder(id: number) {
    return await folderRepository.manager.query(`
      DELETE 
      FROM ${folderRepository.metadata.tableName} 
      WHERE id = $1
      RETURNING *
    `, [id]);
  }
}