import { useParams } from 'react-router-dom';

import { sectionsApi } from '@/entities/section/api-slices';

export const useSectionState = (sectionId?: string) => {
  const urlParams = useParams();

  return sectionsApi
    .endpoints
    .getAllSections
    .useQueryState(undefined, {
      selectFromResult: ({ data }) => data?.find((item) => {
        return item.section_id == parseInt(sectionId || urlParams.sectionId);
      }),
    });
};