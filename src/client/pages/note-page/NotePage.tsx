import React from 'react';
import { useParams } from 'react-router-dom';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

import { useGetNoteQuery } from '@/entities/note/api-slices';
import PageHeader from '@/features/page-header';
import NoteTitleInput from '@/entities/note/ui/note-title-input';
import PageError from '@/shared/ui/page/page-error';
import PageContent from '@/shared/ui/page/page-content';
import PageField from '@/shared/ui/page/page-field';
import PageEditor from '@/shared/ui/page/page-editor';

const NotePage = () => {
  const { noteSlug } = useParams();

  const {
    currentData,
    isError,
    error
  } = useGetNoteQuery(noteSlug, {
    skip: !noteSlug,
    refetchOnMountOrArgChange: true
  });

  if (isError) return <PageError {...error} />;

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