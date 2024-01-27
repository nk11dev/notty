import React from 'react';
import { useParams } from 'react-router-dom';

import type { NoteRouteSlugs } from '@/app/routing/types';
import { useNoteState } from '@/entities/note/hooks';
import NoteMenuBar from '@/entities/note/ui/note-menu-bar';
import PageHeader from '@/shared/ui/page/page-header';
import PageBreadcrumbs from '@/shared/ui/page/page-breadcrumbs';

const NoteHeader = () => {
  const { noteSlug } = useParams() as NoteRouteSlugs;
  const { data } = useNoteState(noteSlug);

  const breadcrumbs = [
    data?.folder_info?.title,
    data?.title,
  ].filter(item => !!item).join(' / ');

  return (
    <PageHeader showBoxShadow={false}>
      <PageBreadcrumbs>
        {breadcrumbs}
      </PageBreadcrumbs>
      <NoteMenuBar />
    </PageHeader>
  );
};

export default NoteHeader;