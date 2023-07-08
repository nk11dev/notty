import React from 'react';
import { useParams } from 'react-router-dom'

import type { FolderRouteSlugs } from '@/app/routing/types';
import { useGetFolderQuery } from '@/entities/folder/api-slices';
import { useSelectDefaultNote } from '@/entities/folder/hooks';
import MessageCreateNote from '@/entities/note/ui/message-create-note';
import PageHeader from '@/features/page-header';
import PageError from '@/shared/ui/page/page-error';
import PageContent from '@/shared/ui/page/page-content';

const FolderPage = () => {
  const { folderSlug } = useParams() as FolderRouteSlugs;

  const {
    currentData,
    isError,
    error
  } = useGetFolderQuery(folderSlug, {
    refetchOnMountOrArgChange: true
  });

  useSelectDefaultNote(folderSlug);

  if (isError) return <PageError {...error} />;

  if (!currentData || (
    Array.isArray(currentData.notes) &&
    currentData.notes.length > 0
  )) {
    return null;
  }

  return (
    <>
      <PageHeader />
      <PageContent>
        <h1>It&rsquo;s an empty folder</h1>
        <MessageCreateNote />
      </PageContent>
    </>
  );
}

export default FolderPage;