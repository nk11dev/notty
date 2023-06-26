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
        const { id, section_id } = lastRow;

        if (section_id != null) {
          navigateWithSearch(`/sections/${section_id}/notes/${id}`);
        }

        // Else - navigate to section itself.
      } else if (affectedRow !== null) {
        navigateWithSearch(`/sections/${affectedRow.section_id}`);
      }
    }
  }

  return [
    handleDeleteNote
  ];
};