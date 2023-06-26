import { sectionsApi } from '@/entities/section/api-slices';

export const useSectionState = (id: string) => sectionsApi
  .endpoints
  .getSection
  .useQueryState(id);