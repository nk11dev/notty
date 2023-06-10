import React from 'react';
import { useParams } from 'react-router-dom';

import { useGetNotesBySectionQuery } from '@/entities/note/api-slices';
import NotesList from '@/features/notes-list';
import NotesContextMenu from '@/features/notes-context-menu';
import NotesEmptyMsg from '@/features/notes-empty-msg';
import ErrorMsg from '@/shared/ui/fetching/error-msg';

const NotesStandardList = () => {
  const { sectionId } = useParams();

  const {
    data,
    isError,
    error
  } = useGetNotesBySectionQuery(sectionId, {
    skip: !sectionId,
    refetchOnMountOrArgChange: true
  });

  if (isError) return <ErrorMsg error={error} />;

  if (!data) return null;

  return data?.length > 0
    ? (<>
      <NotesList data={data} />
      <NotesContextMenu />
    </>)
    : <NotesEmptyMsg />;
}

export default NotesStandardList;