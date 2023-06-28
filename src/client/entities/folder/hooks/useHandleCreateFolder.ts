import { useCreateFolderMutation } from '@/entities/folder/api-slices';
import { useNavigateWithSearch } from '@/shared/hooks';

export const useHandleCreateFolder = () => {
  const [createFolder] = useCreateFolderMutation();
  const { navigateWithSearch } = useNavigateWithSearch();

  async function onCreate() {
    const result = await createFolder();

    if ('data' in result) {
      const { data } = result;

      navigateWithSearch(`/folders/${data.id}`);
    }
  }

  return [
    onCreate
  ];
};