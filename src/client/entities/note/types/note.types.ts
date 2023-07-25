import type { FolderDto } from '@/entities/folder/types';

export type NoteDto = {
  id: number,
  title: string,
  body: string | null,
  is_bookmark: boolean,
  created_at: string,
  updated_at: string | null,
  folder_id: number,
  folder_info?: FolderDto,
  [key: string]: number | string | boolean | FolderDto | undefined | null
};

export type NoteUpdateEndpointArg = {
  id: number | null,
  title?: string,
  body?: string | null,
  is_bookmark?: boolean,
  [key: string]: number | string | boolean | undefined | null
};

export type NoteDeleteResponse = {
  affectedRow: NoteDto | null,
  affectedCount: number,
  lastRow: NoteDto | null,
};