import React from 'react';

import { HttpStatus } from '@/common/constants';

import type { BaseQueryError } from '@/shared/types';
import PageContent from '@/shared/ui/page/page-content';
import ErrorMsg from '@/shared/ui/fetching/error-msg';

const PageError = (props: Partial<BaseQueryError>) => {
  const { status, data } = props;

  if (
    [
      HttpStatus.FORBIDDEN,
      HttpStatus.NOT_FOUND
    ].includes(status as number) &&
    (typeof data?.message === 'string')
  ) {
    return (
      <PageContent>
        <h1>{status}: {data.message}</h1>
      </PageContent>
    );
  }

  return <ErrorMsg {...props} />;
};

export default PageError;