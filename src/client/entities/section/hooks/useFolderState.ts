import { foldersApi } from '@/entities/section/api-slices';

export const useFolderState = (id: string) => foldersApi
  .endpoints
  .getFolder
  .useQueryState(id);