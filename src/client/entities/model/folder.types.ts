import { Note } from '@/entities/model/note.types';

export type Folder = {
  id: number;
  text: string;
  notes: Note[]
};