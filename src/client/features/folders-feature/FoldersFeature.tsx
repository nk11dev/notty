import React from 'react';

import { useGetAllFoldersQuery } from '@/entities/folder/api-slices';
import FoldersList from '@/entities/folder/ui/folders-list';
import ErrorMsg from '@/shared/ui/fetching/error-msg';
import EmptyMsg from '@/shared/ui/fetching/empty-msg';

const FoldersFeature = () => {
  const {
    data,
    isError,
    error
  } = useGetAllFoldersQuery(undefined, {
    refetchOnMountOrArgChange: true
  });

  if (isError) return <ErrorMsg {...error} />;

  if (!data) return null;

  return data?.length > 0
    ? <FoldersList data={data} />
    : <EmptyMsg />;
};

export default FoldersFeature;