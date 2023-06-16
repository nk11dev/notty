import { useEffect } from 'react';

import { sectionsApi } from '@/entities/section/api-slices';
import { useNavigateWithSearch } from '@/shared/hooks';

export const useNavigateToDefaultNote = (sectionId: string) => {
  const { navigateWithSearch } = useNavigateWithSearch();

  const {
    currentData,
    isFetching,
  } = sectionsApi.endpoints.getSection.useQueryState(sectionId);

  useEffect(() => {
    if (!isFetching && currentData) {
      const [firstNote] = currentData.notes || [];

      if (firstNote) {
        const url = `/sections/${firstNote.section_id}/notes/${firstNote.note_id}`;

        navigateWithSearch(url, { replace: true });
      }
    }
  }, [isFetching, currentData, navigateWithSearch]);
};