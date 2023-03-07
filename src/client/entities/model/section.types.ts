import { Note } from '@/entities/model/note.types';

export type Section = {
  section_id: number;
  title: string;
  notes?: Note[]
};