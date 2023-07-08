import React from 'react';
import { useParams } from 'react-router-dom';

import type { FolderRouteSlugs } from '@/app/routing/types';
import { useFolderState } from '@/entities/folder/hooks';
import PageHeader from '@/shared/ui/page/page-header';
import PageBreadcrumbs from '@/shared/ui/page/page-breadcrumbs';

const FolderHeader = () => {
  const { folderSlug } = useParams() as FolderRouteSlugs;
  const { data } = useFolderState(folderSlug);

  return (
    <PageHeader>
      <PageBreadcrumbs>
        {data?.title}
      </PageBreadcrumbs>
    </PageHeader>
  );
};

export default FolderHeader;