import type { Note } from '@/entities/note/types';

export type FolderDto = {
  id: number,
  title: string,
  created_at?: string,
  updated_at?: string,
  notes?: Note[],
  notes_count?: number
};

export type FolderDeleteResponse = {
  affectedRows: FolderDto[],
  affectedCount: number,
  lastRow: FolderDto | null,
};