import { foldersApi } from '@/entities/section/api-slices';

export const useSectionsState = () => {
  return foldersApi.endpoints.getAllFolders.useQueryState();
};