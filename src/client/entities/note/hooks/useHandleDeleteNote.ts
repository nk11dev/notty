import { useDeleteNoteMutation } from '@/entities/note/api-slices';
import { useNavigateWithSearch } from '@/shared/hooks';

export const useHandleDeleteNote = () => {
  const [deleteNote] = useDeleteNoteMutation();
  const { navigateWithSearch } = useNavigateWithSearch();

  async function handleDeleteNote(id: string) {
    const result = await deleteNote(id);

    if ('data' in result) {
      const { data } = result;
      const { lastRow, affectedRow } = data;

      // If there is other notes in this section - navigate to last note.
      if (lastRow !== null) {
        const { id, folder_id } = lastRow;

        if (folder_id !== null) {
          navigateWithSearch(`/sections/${folder_id}/notes/${id}`);
        }

        // Else - navigate to section itself.
      } else if (affectedRow !== null) {
        navigateWithSearch(`/sections/${affectedRow.folder_id}`);
      }
    }
  }

  return [
    handleDeleteNote
  ];
};