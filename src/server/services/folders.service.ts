import dataSource from '@/server/orm/datasource';
import FolderEntity from '@/server/orm/entities/folder.entity';
import NoteEntity from '@/server/orm/entities/note.entity';
import type {
  FolderPayload
} from '@/server/types/folder.types';

const folderRepository = dataSource.getRepository(FolderEntity);
const noteRepository = dataSource.getRepository(NoteEntity);

export default class FoldersService {

  static async getAllFolders() {
    return await folderRepository.manager.query(`
      SELECT
        s.id,
        s.title,
        count(n.id)::int as notes_count
      FROM ${folderRepository.metadata.tableName} s
      LEFT JOIN ${noteRepository.metadata.tableName} n on s.id = n.folder_id
      GROUP BY s.id
      ORDER BY s.id ASC
    `);
  }

  static async getOneFolder(id: number) {
    return await folderRepository
      .createQueryBuilder('f')
      .leftJoinAndSelect('f.notes', 'n')
      .orderBy('n.id', 'ASC')
      .where(`f.id = :id`, { id })
      .getOne();
  }

  static async getLastFolder() {
    const [result] = await folderRepository.manager.query(`
      SELECT *
      FROM ${folderRepository.metadata.tableName}
      ORDER BY id DESC
      LIMIT 1
    `);

    return result || null;
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