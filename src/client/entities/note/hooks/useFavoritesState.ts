import { notesApi } from '@/entities/note/api-slices';

export const useFavoritesState = () => {
  return notesApi.endpoints.getFavorites.useQueryState();
};