export type Note = {
  note_id: number,
  title: string,
  body: string | null,
  is_favorite: boolean,
  created_at: string,
  updated_at: string | null,
  section_id: number,
  [key: string]: number | string | boolean | undefined
};

export type NoteUpdateEndpointArg = {
  id: number,
  title?: string,
  body?: string,
  is_favorite?: boolean,
  [key: string]: number | string | boolean | undefined
};

export type NoteDeleteResponse = {
  affectedCount: number,
  affectedRow: Note | null,
  lastRow: Note | null,
};