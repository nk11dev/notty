import type { Note } from '@/entities/note/types';

export type Section = {
  section_id: number;
  title: string;
  notes?: Note[]
};