import React from 'react';
import { useParams } from 'react-router-dom';
import { faCalendarDays, faPencil } from '@fortawesome/free-solid-svg-icons';

import { useGetNoteQuery } from '@/entities/note/api-slices';
import NoteTitleInput from '@/features/note-title-input';
import NoteBodyTextarea from '@/features/note-body-textarea';
import ErrorMsg from '@/shared/ui/fetching/error-msg';
import PageField from '@/shared/ui/page/page-field';
import PageEditor from '@/shared/ui/page/page-editor';

const NoteContent = () => {
  const { noteId } = useParams();

  const {
    currentData,
    isError,
    error
  } = useGetNoteQuery(noteId, {
    skip: !noteId,
    refetchOnMountOrArgChange: true
  });

  if (isError) return <ErrorMsg error={error} />;

  if (!currentData) return null;

  return (
    <>
      <NoteTitleInput />

      <div>
        <PageField
          icon={faCalendarDays}
          data={currentData.created_at}
        />

        <PageField
          icon={faPencil}
          data={currentData.updated_at}
        />
      </div>

      <NoteBodyTextarea />

      <PageEditor />
    </>
  );
};

export default NoteContent;