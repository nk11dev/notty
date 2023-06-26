import { useCreateNoteMutation } from '@/entities/note/api-slices';
import {
  useCustomSearchParams,
  useNavigateWithSearch
} from '@/shared/hooks';

export const useHandleCreateNote = () => {
  const [createNote] = useCreateNoteMutation();

  const { getCustomSearchParams } = useCustomSearchParams();
  const { navigateWithSearch } = useNavigateWithSearch();

  async function handleCreateNote(folderId: string) {
    const result = await createNote(folderId);

    if ('data' in result) {
      const { data } = result;

      navigateWithSearch({
        pathname: `/sections/${data.section_id}/notes/${data.note_id}`,
        search: getCustomSearchParams({ hideSidebarOnMobile: true })
      });
    }
  }

  return [
    handleCreateNote
  ];
};