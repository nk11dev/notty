import React from 'react';

import type { BaseQueryError } from '@/shared/types';
import PageContent from '@/shared/ui/page/page-content';
import ErrorMsg from '@/shared/ui/fetching/error-msg';

const NoteError = (props: Partial<BaseQueryError>) => {
  if (
    (props.status === 404) &&
    (typeof props.data === 'string')
  ) {
    return (
      <PageContent>
        <h1>{props.data}</h1>
      </PageContent>
    );
  }

  return <ErrorMsg {...props} />;
};

export default NoteError;