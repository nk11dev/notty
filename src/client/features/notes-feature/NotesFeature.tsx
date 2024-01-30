import React from 'react';
import { useParams } from 'react-router-dom';

import type { NoteOptionalRouteSlugs } from '@/app/routing/types';
import { useGetNotesByFolderQuery } from '@/entities/note/api-slices';
import NotesList from '@/entities/note/ui/notes-list';
import ErrorMsg from '@/shared/ui/fetching/error-msg';
import EmptyMsg from '@/shared/ui/fetching/empty-msg';

const NotesFeature = () => {
  const { folderSlug } = useParams() as NoteOptionalRouteSlugs;

  const {
    data,
    isError,
    error
  } = useGetNotesByFolderQuery(folderSlug, {
    refetchOnMountOrArgChange: true
  });

  if (isError) return <ErrorMsg {...error} />;

  if (!data) return null;

  return data?.length > 0
    ? <NotesList data={data} />
    : <EmptyMsg />;
}

export default NotesFeature;