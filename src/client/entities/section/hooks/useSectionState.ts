import { sectionsApi } from '@/entities/section/api-slices';

export const useSectionState = (sectionId: string) => sectionsApi
  .endpoints
  .getSection
  .useQueryState(sectionId);