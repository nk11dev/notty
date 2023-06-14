import React from 'react';

import { useGetBookmarksQuery } from '@/entities/note/api-slices';
import NotesList from '@/entities/note/ui/notes-list';
import NotesContextMenu from '@/entities/note/ui/notes-context-menu';
import ErrorMsg from '@/shared/ui/fetching/error-msg';
import EmptyMsg from '@/shared/ui/fetching/empty-msg';

const BookmarksFeature = () => {
  const {
    data,
    isError,
    error
  } = useGetBookmarksQuery(undefined, {
    refetchOnMountOrArgChange: true
  });

  if (isError) return <ErrorMsg error={error} />;

  if (!data) return null;

  return data?.length > 0
    ? (
      <>
        <NotesList data={data} />
        <NotesContextMenu />
      </>
    )
    : <EmptyMsg />;
}

export default BookmarksFeature;