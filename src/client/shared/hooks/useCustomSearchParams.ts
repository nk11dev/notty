import { useSearchParams } from 'react-router-dom';

import { SMALL_BREAKPOINT } from '@/app/constants/breakpoints.constants';
import { SIDEBAR_MODE_QUERY_PARAM } from '@/app/constants/query-params.constants';
import { SidebarModesMap } from '@/app/enums/query-params.enums';
import type { SearchParamsOptions } from '@/shared/types';

export const useCustomSearchParams = () => {
  const [searchParams] = useSearchParams();

  const isSmall = window.matchMedia(`(max-width: ${SMALL_BREAKPOINT})`);

  function getCustomSearchParams(options: SearchParamsOptions) {
    const { hideSidebarOnMobile } = options;

    if (isSmall.matches) {
      if (hideSidebarOnMobile) {
        searchParams.set(SIDEBAR_MODE_QUERY_PARAM, SidebarModesMap.HIDDEN);
      }
    }

    return searchParams;
  }

  return {
    getCustomSearchParams,
  };
};