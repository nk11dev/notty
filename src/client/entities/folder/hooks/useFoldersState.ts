import { foldersApi } from '@/entities/folder/api-slices';

export const useFoldersState = () => {
  return foldersApi.endpoints.getAllFolders.useQueryState();
};