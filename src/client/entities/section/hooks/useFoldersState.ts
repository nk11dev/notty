import { foldersApi } from '@/entities/section/api-slices';

export const useFoldersState = () => {
  return foldersApi.endpoints.getAllFolders.useQueryState();
};