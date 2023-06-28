import { foldersApi } from '@/entities/folder/api-slices';

export const useFolderState = (id: string) => foldersApi
  .endpoints
  .getFolder
  .useQueryState(id);