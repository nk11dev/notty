import { useEffect } from 'react';

import { useNavigateWithSearch } from '@/shared/hooks';
import { useFolderState } from './useFolderState';

export const useSelectDefaultNote = (folderId: string) => {
  const { navigateWithSearch } = useNavigateWithSearch();

  const {
    currentData,
    isFetching,
  } = useFolderState(folderId);

  useEffect(() => {
    if (!isFetching && currentData) {
      const [firstNote] = currentData.notes || [];

      if (firstNote) {
        const url = `/folders/${firstNote.folder_id}/notes/${firstNote.id}`;

        navigateWithSearch(url, { replace: true });
      }
    }
  }, [isFetching, currentData, navigateWithSearch]);
};