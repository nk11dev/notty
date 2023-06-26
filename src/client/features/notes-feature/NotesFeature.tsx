import React from 'react';
import { useParams } from 'react-router-dom';

import { useGetNotesBySectionQuery } from '@/entities/note/api-slices';
import NotesList from '@/entities/note/ui/notes-list';
import MessageCreateNote from '@/entities/note/ui/message-create-note';
import ErrorMsg from '@/shared/ui/fetching/error-msg';
import EmptyMsg from '@/shared/ui/fetching/empty-msg';

const NotesFeature = () => {
  const { folderSlug } = useParams();

  const {
    data,
    isError,
    error
  } = useGetNotesBySectionQuery(folderSlug, {
    skip: !folderSlug,
    refetchOnMountOrArgChange: true
  });

  if (isError) return <ErrorMsg {...error} />;

  if (!data) return null;

  return data?.length > 0
    ? <NotesList data={data} />
    : (
      <EmptyMsg>
        <MessageCreateNote />
      </EmptyMsg>
    );
}

export default NotesFeature;