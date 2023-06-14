import React from 'react';
import { useParams } from 'react-router-dom';

import { useGetNotesBySectionQuery } from '@/entities/note/api-slices';
import NotesList from '@/entities/note/ui/notes-list';
import NotesContextMenu from '@/entities/note/ui/notes-context-menu';
import MessageCreateNote from '@/entities/note/ui/message-create-note';
import ErrorMsg from '@/shared/ui/fetching/error-msg';
import EmptyMsg from '@/shared/ui/fetching/empty-msg';

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
    ? (
      <>
        <NotesList data={data} />
        <NotesContextMenu />
      </>
    )
    : (
      <EmptyMsg>
        <MessageCreateNote />
      </EmptyMsg>
    );
}

export default NotesStandardList;