import type { Note } from '@/entities/note/types';

export type Section = {
  section_id: number,
  title: string,
  created_at?: string,
  updated_at?: string,
  notes?: Note[],
  notes_count?: number
};

export type SectionUpdateEndpointArg = {
  id: string,
  title: string
};

export type SectionDeleteResponse = {
  affectedRows: Section[],
  affectedCount: number,
  lastRow: Section,
};