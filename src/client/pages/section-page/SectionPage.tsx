import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'

import { useSectionState } from '@/entities/section/hooks';
import { useNotesState } from '@/entities/note/hooks';
import PageHeader from '@/features/page-header';
import MessageCreateNote from '@/features/message-create-note';
import { useNavigateWithSearch } from '@/shared/hooks';
import PageContent from '@/shared/ui/page/page-content';

const SectionPage = () => {
  const { sectionId } = useParams();
  const { navigateWithSearch } = useNavigateWithSearch();

  const { data: sectionData } = useSectionState(sectionId);
  const { data: notesData } = useNotesState(sectionId);

  useEffect(() => {
    const [firstNote] = notesData || [];

    if (firstNote) {
      const url = `/sections/${firstNote.section_id}/notes/${firstNote.note_id}`;

      navigateWithSearch(url, { replace: true });
    }
  }, [notesData, navigateWithSearch]);

  if (!sectionData || sectionData?.notes_count > 0) return null;

  return (
    <>
      <PageHeader />
      <PageContent>
        <h1>It&rsquo;s an empty section</h1>
        <MessageCreateNote />
      </PageContent>
    </>
  );
}

export default SectionPage;