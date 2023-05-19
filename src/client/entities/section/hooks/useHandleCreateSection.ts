import { useCreateSectionMutation } from '@/entities/section/api-slices';
import { useNavigateWithSearch } from '@/shared/hooks';

export const useHandleCreateSection = () => {
  const [createSection] = useCreateSectionMutation();
  const { navigateWithSearch } = useNavigateWithSearch();

  async function handleCreateSection() {
    const result = await createSection();

    if ('data' in result) {
      const { data } = result;

      navigateWithSearch(`/sections/${data.section_id}`);
    }
  }

  return [
    handleCreateSection
  ];
};