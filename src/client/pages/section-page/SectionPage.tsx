import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'

import { useGetSectionQuery } from '@/entities/section/api-slices';
import { useNotesState } from '@/entities/note/hooks';
import PageHeader from '@/features/page-header';
import MessageCreateNote from '@/entities/note/ui/message-create-note';
import { useNavigateWithSearch } from '@/shared/hooks';
import PageError from '@/shared/ui/page/page-error';
import PageContent from '@/shared/ui/page/page-content';

const SectionPage = () => {
  const { sectionId } = useParams();
  const { navigateWithSearch } = useNavigateWithSearch();

  const { 
    data: sectionData,
    isFetching, 
    isError,
    error
   } = useGetSectionQuery(sectionId, {
    refetchOnMountOrArgChange: true
  });
  const { data: notesData } = useNotesState(sectionId);

  useEffect(() => {
    const [firstNote] = notesData || [];

    if (!isFetching && firstNote) {
      const url = `/sections/${firstNote.section_id}/notes/${firstNote.note_id}`;

      navigateWithSearch(url, { replace: true });
    }
  }, [isFetching, notesData, navigateWithSearch]);

  if (isError) return <PageError {...error} />;

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