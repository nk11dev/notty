export type NotesGetQueryParams = {
  filterByIsBookmark: boolean | undefined;
};

export type NotePayload = {
  title: string | undefined;
  body: string | undefined;
  is_bookmark: boolean | undefined;
};