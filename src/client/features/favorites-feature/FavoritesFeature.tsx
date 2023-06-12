import React from 'react';

import { useGetFavoritesQuery } from '@/entities/note/api-slices';
import NotesList from '@/features/notes-list';
import NotesContextMenu from '@/features/notes-context-menu';
import ErrorMsg from '@/shared/ui/fetching/error-msg';
import EmptyMsg from '@/shared/ui/fetching/empty-msg';

const FavoritesFeature = () => {
  const {
    data,
    isError,
    error
  } = useGetFavoritesQuery(undefined, {
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

export default FavoritesFeature;