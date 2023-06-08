import React from 'react';
import { useParams } from 'react-router-dom'

import { useSectionState } from '@/entities/section/hooks';
import PageHeader from '@/features/page-header';
import PageContent from '@/shared/ui/page/page-content';
import MessageCreateNote from '@/features/message-create-note';

const SectionPage = () => {
  const { sectionId } = useParams();
  const { data } = useSectionState(sectionId);

  if (!data || data?.notes_count > 0) return null;

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