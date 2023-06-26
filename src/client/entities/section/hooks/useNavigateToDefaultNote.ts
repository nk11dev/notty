import { useEffect } from 'react';

import { useNavigateWithSearch } from '@/shared/hooks';
import { useSectionState } from './useSectionState';

export const useNavigateToDefaultNote = (folderId: string) => {
  const { navigateWithSearch } = useNavigateWithSearch();

  const {
    currentData,
    isFetching,
  } = useSectionState(folderId);

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