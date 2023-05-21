import { sectionsApi } from '@/entities/section/api-slices';

export const useSectionsState = () => {
  return sectionsApi.endpoints.getAllSections.useQueryState();
};