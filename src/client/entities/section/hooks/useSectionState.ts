import { foldersApi } from '@/entities/section/api-slices';

export const useSectionState = (id: string) => foldersApi
  .endpoints
  .getSection
  .useQueryState(id);