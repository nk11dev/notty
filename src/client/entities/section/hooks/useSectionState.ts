import { sectionsApi } from '@/entities/section/api-slices';

export const useSectionState = (sectionId: string) => sectionsApi
  .endpoints
  .getAllSections
  .useQueryState(undefined, {
    selectFromResult: (state) => ({
      ...state,
      data: state.data?.find((item) => item.section_id == parseInt(sectionId))
    })
  });