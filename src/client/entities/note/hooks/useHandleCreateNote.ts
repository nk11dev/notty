import { useCreateNoteMutation } from '@/entities/note/api-slices';
import {
  useCustomSearchParams,
  useNavigateWithSearch
} from '@/shared/hooks';

export const useHandleCreateNote = () => {
  const [createNote] = useCreateNoteMutation();

  const { getCustomSearchParams } = useCustomSearchParams();
  const { navigateWithSearch } = useNavigateWithSearch();

  async function handleCreateNote(sectionId: string) {
    const result = await createNote(sectionId);

    if ('data' in result) {
      const { data } = result;

      navigateWithSearch(`/sections/${data.section_id}/notes/${data.note_id}`,
        getCustomSearchParams({ hideSidebarOnMobile: true })
      );
    }
  }

  return [
    handleCreateNote
  ];
};