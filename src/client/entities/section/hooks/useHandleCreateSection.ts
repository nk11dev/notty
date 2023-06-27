import { useCreateFolderMutation } from '@/entities/section/api-slices';
import { useNavigateWithSearch } from '@/shared/hooks';

export const useHandleCreateSection = () => {
  const [createFolder] = useCreateFolderMutation();
  const { navigateWithSearch } = useNavigateWithSearch();

  async function handleCreateSection() {
    const result = await createFolder();

    if ('data' in result) {
      const { data } = result;

      navigateWithSearch(`/sections/${data.id}`);
    }
  }

  return [
    handleCreateSection
  ];
};