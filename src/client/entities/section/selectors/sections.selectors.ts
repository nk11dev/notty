import { RootState } from '@/app/redux/store';

export const sectionsSelector = ((state: RootState) => (
  state.sections
));