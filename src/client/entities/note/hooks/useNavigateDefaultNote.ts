import { useEffect } from 'react';

import { notesApi } from '@/entities/note/api-slices';
import {
  usePrevious,
  useNavigateWithSearch,
} from '@/shared/hooks';

export const useNavigateDefaultNote = (sectionId: string): void => {
  const { navigateWithSearch } = useNavigateWithSearch();

  const state = notesApi.endpoints.getNotesBySection.useQueryState(sectionId);

  const [defaultNote] = state.data || [];
  const prevDefaultNote = usePrevious(defaultNote);

  useEffect(() => {
    if (defaultNote && (defaultNote !== prevDefaultNote)) {
      navigateWithSearch(`/sections/${defaultNote.section_id}/notes/${defaultNote.note_id}`);
    }
  }, [defaultNote, prevDefaultNote, navigateWithSearch]);
};