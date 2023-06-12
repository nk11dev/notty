export type Note = {
  note_id: number,
  title: string,
  body: string | null,
  is_bookmark: boolean,
  created_at: string,
  updated_at: string | null,
  section_id: number,
  [key: string]: number | string | boolean | undefined
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