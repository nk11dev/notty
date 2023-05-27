import styles from './NoteContent.module.scss';

import React from 'react';
import { useParams } from 'react-router-dom';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

import { useGetNoteQuery } from '@/entities/note/api-slices';
import NoteTitleInput from '@/features/note-title-input';
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
    <div className={styles.contentWrapper}>
      <NoteTitleInput />

      <PageField
        icon={faFloppyDisk}
        data={currentData.updated_at || currentData.created_at}
      />

      <PageEditor />
    </div>
  );
};

export default NoteContent;