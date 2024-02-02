import type { FolderDto } from '@/entities/folder/types';

export type NoteDto = {
  id: string,
  title: string,
  body: string | null,
  is_bookmark: boolean,
  created_at: string,
  updated_at: string | null,
  folder_id: string,
  folder_info?: FolderDto,
  [key: string]: string | boolean | FolderDto | undefined | null
};

export type NoteUpdateEndpointArg = {
  id: string | null,
  title?: string,
  body?: string | null,
  is_bookmark?: boolean,
  [key: string]: string | boolean | undefined | null
};

export type NoteDeleteResponse = {
  affectedRow: NoteDto | null,
  affectedCount: number,
  lastRow: NoteDto | null,
};