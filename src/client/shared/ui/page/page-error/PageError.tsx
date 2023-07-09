import React from 'react';

import type { BaseQueryError } from '@/shared/types';
import PageContent from '@/shared/ui/page/page-content';
import ErrorMsg from '@/shared/ui/fetching/error-msg';

const PageError = (props: Partial<BaseQueryError>) => {
  const { error } = props.data || {};

  if (
    (props.status === 404) &&
    (typeof error?.message === 'string')
  ) {
    return (
      <PageContent>
        <h1>{error.message}</h1>
      </PageContent>
    );
  }

  return <ErrorMsg {...props} />;
};

export default PageError;