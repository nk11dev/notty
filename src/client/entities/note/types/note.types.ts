export type Note = {
  note_id: number;
  title: string;
  body: string | null;
  created_at: string;
  updated_at: string | null;
  section_id: number;
};

export type NoteUpdateEndpointArg = {
  id: number,
  title: string
};

export type NoteDeleteResponse = {
  affectedCount: number,
  affectedRow: Note | null,
  lastRow: Note | null,
};