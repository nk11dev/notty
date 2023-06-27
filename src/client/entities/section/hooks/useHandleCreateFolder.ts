import { useCreateFolderMutation } from '@/entities/section/api-slices';
import { useNavigateWithSearch } from '@/shared/hooks';

export const useHandleCreateFolder = () => {
  const [createFolder] = useCreateFolderMutation();
  const { navigateWithSearch } = useNavigateWithSearch();

  async function onCreate() {
    const result = await createFolder();

    if ('data' in result) {
      const { data } = result;

      navigateWithSearch(`/sections/${data.id}`);
    }
  }

  return [
    onCreate
  ];
};