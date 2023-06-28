import React from 'react';

import { useGetAllFoldersQuery } from '@/entities/folder/api-slices';
import ErrorMsg from '@/shared/ui/fetching/error-msg';
import FoldersList from '@/entities/folder/ui/folders-list';

const FoldersFeature = () => {
  const {
    data,
    isError,
    error
  } = useGetAllFoldersQuery();

  if (isError) return <ErrorMsg {...error} />;

  if (!data || data?.length <= 0) return null;

  return <FoldersList data={data} />;
};

export default FoldersFeature;