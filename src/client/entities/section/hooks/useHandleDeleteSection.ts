import { useDeleteSectionMutation } from '@/entities/section/api-slices';
import { useNavigateWithSearch } from '@/shared/hooks';

export const useHandleDeleteSection = () => {
  const [deleteSection] = useDeleteSectionMutation();
  const { navigateWithSearch } = useNavigateWithSearch();

  async function handleDeleteSection(id: string) {
    const result = await deleteSection(id);

    if ('data' in result) {
      const { data } = result;
      const { lastRow } = data;

      if (lastRow !== null) {
        navigateWithSearch(`/sections/${lastRow.section_id}`);
      }
    }
  }

  return [
    handleDeleteSection
  ];
};