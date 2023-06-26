import type { Section } from '@/entities/section/types';

export type Note = {
  id: number,
  title: string,
  body: string | null,
  is_bookmark: boolean,
  created_at: string,
  updated_at: string | null,
  folder_id: number,
  section?: Section,
  [key: string]: number | string | boolean | undefined | Section
};

export type NoteUpdateEndpointArg = {
  id: number,
  title?: string,
  body?: string,
  is_bookmark?: boolean,
  [key: string]: number | string | boolean | undefined
};

export type NoteDeleteResponse = {
  affectedCount: number,
  affectedRow: Note | null,
  lastRow: Note | null,
};