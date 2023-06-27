import { useDeleteFolderMutation } from '@/entities/section/api-slices';
import { useNavigateWithSearch } from '@/shared/hooks';

export const useHandleDeleteSection = () => {
  const [deleteFolder] = useDeleteFolderMutation();
  const { navigateWithSearch } = useNavigateWithSearch();

  async function handleDeleteSection(id: string) {
    const result = await deleteFolder(id);

    if ('data' in result) {
      const { data } = result;
      const { lastRow } = data;

      if (lastRow !== null) {
        navigateWithSearch(`/sections/${lastRow.id}`);
      } else {
        navigateWithSearch(`/`);
      }
    }
  }

  return [
    handleDeleteSection
  ];
};