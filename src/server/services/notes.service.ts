import dataSource from '@/server/orm/datasource';
import NoteEntity from '@/server/orm/entities/note.entity';
import type {
  NotesGetQueryParams,
  NotePayload,
} from '@/server/types/note.types';

const noteRepository = dataSource.getRepository(NoteEntity);

export default class NotesService {

  static async getAllNotes(folderId: number, queryParams: unknown) {
    const { filterByIsBookmark } = queryParams as NotesGetQueryParams;

    return await noteRepository
      .createQueryBuilder()
      .orderBy('id', 'ASC')

      .andWhere(folderId
        ? `folder_id = :folderId`
        : '1=1',
        { folderId }
      )

      .andWhere((typeof filterByIsBookmark !== 'undefined')
        ? 'is_bookmark = :value'
        : '1=1',
        { value: filterByIsBookmark })

      .getMany();
  }

  static async getOneNote(noteId: number) {
    return await noteRepository
      .createQueryBuilder('n')
      .leftJoinAndSelect('n.folder_info', 'f')
      .where(`n.id = :noteId`, { noteId })
      .getOne();
  }

  static async getLastNoteInFolder(folderId: number) {
    const [result] = await noteRepository
      .createQueryBuilder()
      .where(`folder_id = :folderId`, { folderId })
      .orderBy('id', 'DESC')
      .limit(1)
      .getMany();

    return result;
  }

  static async createNote(payload: NotePayload) {
    const { raw: [result] } = await noteRepository
      .createQueryBuilder()
      .insert()
      .values(payload)
      .returning('*')
      .execute();

    return result;
  }

  static async updateNote(noteId: number, payload: NotePayload) {
    return await noteRepository
      .createQueryBuilder()
      .update()
      .set({
        ...payload,
        updated_at: new Date(),
      })
      .where('id = :noteId', { noteId })
      .returning('*')
      .execute();
  }

  static async deleteNote(noteId: number) {
    return await noteRepository.manager.query(`
      DELETE 
      FROM ${noteRepository.metadata.tableName} 
      WHERE id = $1
      RETURNING *
    `, [noteId]);
  }
}