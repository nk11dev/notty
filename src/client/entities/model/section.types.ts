import { Note } from '@/entities/model/note.types';

export type Section = {
  id: number;
  text: string;
  notes?: Note[]
};