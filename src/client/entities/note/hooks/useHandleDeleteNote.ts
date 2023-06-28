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

      // If there is other notes in this folder - navigate to last note.
      if (lastRow !== null) {
        const { id, folder_id } = lastRow;

        if (folder_id !== null) {
          navigateWithSearch(`/folders/${folder_id}/notes/${id}`);
        }

        // Else - navigate to folder itself.
      } else if (affectedRow !== null) {
        navigateWithSearch(`/folders/${affectedRow.folder_id}`);
      }
    }
  }

  return [
    handleDeleteNote
  ];
};