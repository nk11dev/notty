import dataSource from '@/server/orm/datasource';
import NoteEntity from '@/server/orm/entities/note.entity';
import type {
  NotesGetQueryParams,
  NotePayload,
} from '@/server/types/note.types';

const noteRepository = dataSource.getRepository(NoteEntity);

export default {

  getAllNotes: async (
    folderId: number,
    userIdCondition: number | null,
    queryParams: unknown
  ) => {
    const { filterByIsBookmark } = queryParams as NotesGetQueryParams;

    return await noteRepository
      .createQueryBuilder()
      .orderBy('id', 'ASC')

      .andWhere(folderId
        ? 'folder_id = :folderId'
        : '1=1',
        { folderId }
      )

      .andWhere(userIdCondition
        ? 'user_id = :user_id'
        : '1=1', { user_id: userIdCondition }
      )

      .andWhere((typeof filterByIsBookmark !== 'undefined')
        ? 'is_bookmark = :value'
        : '1=1',
        { value: filterByIsBookmark })

      .getMany();
  },

  getNote: async (noteId: number) => {
    return await noteRepository
      .createQueryBuilder('n')
      .leftJoinAndSelect('n.folder_info', 'f')
      .where('n.id = :noteId', { noteId })
      .take(1)
      .getOne();
  },

  getLastNoteInFolder: async (folderId: number) => {
    const [result] = await noteRepository
      .createQueryBuilder()
      .where('folder_id = :folderId', { folderId })
      .orderBy('id', 'DESC')
      .limit(1)
      .getMany();

    return result;
  },

  createNote: async (payload: NotePayload) => {
    const { raw: [result] } = await noteRepository
      .createQueryBuilder()
      .insert()
      .values(payload)
      .returning('*')
      .execute();

    return result;
  },

  updateNote: async (noteId: number, payload: NotePayload) => {
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
  },

  deleteNote: async (noteId: number) => {
    return await noteRepository.manager.query(`
      DELETE 
      FROM ${noteRepository.metadata.tableName} 
      WHERE id = $1
      RETURNING *
    `, [noteId]);
  }
};