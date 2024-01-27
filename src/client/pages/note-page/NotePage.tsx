import React from 'react';
import { useParams } from 'react-router-dom';
import { FaSave } from 'react-icons/fa';

import type { NoteRouteSlugs } from '@/app/routing/types';
import { useGetNoteQuery } from '@/entities/note/api-slices';
import NoteHeader from '@/entities/note/ui/note-header';
import NoteTitleInput from '@/entities/note/ui/note-title-input';
import EditorPage from '@/shared/ui/editor/editor-page';
import EditorMenu from '@/shared/ui/editor/editor-menu';
import PageError from '@/shared/ui/page/page-error';
import PageContent from '@/shared/ui/page/page-content';
import PageInfo from '@/shared/ui/page/page-info';

const NotePage = () => {
  const { noteSlug } = useParams() as NoteRouteSlugs;

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
    <EditorPage render={(editorContent) => (<>
      <NoteHeader />
      <EditorMenu />

      <PageContent>
        <NoteTitleInput />
        <PageInfo
          icon={<FaSave size={16} />}
          text={currentData?.updated_at || (currentData?.created_at as string)}
        />
        {editorContent}
      </PageContent>
    </>)} />
  );
};

export default NotePage;