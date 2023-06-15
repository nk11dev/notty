import React from 'react';
import { useParams } from 'react-router-dom';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

import { useGetNoteQuery } from '@/entities/note/api-slices';
import PageHeader from '@/features/page-header';
import NoteTitleInput from '@/entities/note/ui/note-title-input';
import NoteError from '@/entities/note/ui/note-error';
import PageContent from '@/shared/ui/page/page-content';
import PageField from '@/shared/ui/page/page-field';
import PageEditor from '@/shared/ui/page/page-editor';

const NotePage = () => {
  const { noteId } = useParams();

  const {
    currentData,
    isError,
    error
  } = useGetNoteQuery(noteId, {
    skip: !noteId,
    refetchOnMountOrArgChange: true
  });

  if (isError) return <NoteError {...error} />;

  if (!currentData) return null;

  return (
    <>
      <PageHeader />

      <PageContent isFlex>
        <NoteTitleInput />

        <PageField
          icon={faFloppyDisk}
          data={currentData.updated_at || currentData.created_at}
        />

        <PageEditor />
      </PageContent>
    </>
  );
};

export default NotePage;