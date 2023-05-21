import { useEffect } from 'react';

import { notesApi } from '@/entities/note/api-slices';
import {
  usePrevious,
  useNavigateWithSearch,
} from '@/shared/hooks';

type Options = {
  skip: boolean
};

export const useNavigateDefaultNote = (
  sectionId: string,
  options?: Options
): void => {
  const { skip = false } = options || {};

  const { navigateWithSearch } = useNavigateWithSearch();

  const state = notesApi.endpoints.getNotesBySection.useQueryState(sectionId);

  const [defaultNote] = state.data || [];
  const prevDefaultNote = usePrevious(defaultNote);

  useEffect(() => {
    if (!skip && defaultNote && (defaultNote !== prevDefaultNote)) {
      navigateWithSearch(`/sections/${defaultNote.section_id}/notes/${defaultNote.note_id}`);
    }
  }, [skip, defaultNote, prevDefaultNote, navigateWithSearch]);
};