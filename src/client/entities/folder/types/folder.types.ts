import type { NoteDto } from '@/entities/note/types';

export type FolderDto = {
  id: string,
  title: string,
  created_at?: string,
  updated_at?: string,
  notes?: NoteDto[],
  notes_count?: number
};

export type FolderDeleteResponse = {
  affectedRow: FolderDto | null,
  affectedCount: number,
  lastRow: FolderDto | null,
};