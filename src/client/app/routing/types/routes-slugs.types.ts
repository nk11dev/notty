export type FolderRouteSlugs = {
  folderSlug: string
};

export type NoteRouteSlugs = {
  folderSlug: string,
  noteSlug: string,
};

export type NoteOptionalRouteSlugs = {
  folderSlug: string,
  noteSlug?: string,
};