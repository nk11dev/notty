import React from 'react';

import { useGetBookmarksQuery } from '@/entities/note/api-slices';
import NotesList from '@/entities/note/ui/notes-list';
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

  if (isError) return <ErrorMsg {...error} />;

  if (!data) return null;

  return data?.length > 0
    ? <NotesList data={data} />
    : <EmptyMsg />;
}

export default BookmarksFeature;