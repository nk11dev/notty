import React from 'react';

import { useGetAllSectionsQuery } from '@/entities/section/api-slices';
import ErrorMsg from '@/shared/ui/fetching/error-msg';
import SectionsList from '@/entities/section/ui/sections-list';

const SectionsFeature = () => {
  const {
    data,
    isError,
    error
  } = useGetAllSectionsQuery();

  if (isError) return <ErrorMsg {...error} />;

  if (!data || data?.length <= 0) return null;

  return <SectionsList data={data} />;
};

export default SectionsFeature;