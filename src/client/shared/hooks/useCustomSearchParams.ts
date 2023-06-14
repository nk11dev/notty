import { useSearchParams } from 'react-router-dom';

import { SIDEBAR_MODE_QUERY_PARAM } from '@/app/constants/query-params.constants';
import { SidebarModesMap } from '@/app/enums/query-params.enums';
import { useDeviceMatch } from '@/shared/hooks';
import type { SearchParamsOptions } from '@/shared/types';

export const useCustomSearchParams = () => {
  const [searchParams] = useSearchParams();
  const { isMobile } = useDeviceMatch();

  function getCustomSearchParams(options: SearchParamsOptions) {
    const { hideSidebarOnMobile } = options;

    if (isMobile && hideSidebarOnMobile) {
      searchParams.set(SIDEBAR_MODE_QUERY_PARAM, SidebarModesMap.HIDDEN);
    }

    return searchParams.toString();
  }

  return {
    getCustomSearchParams,
  };
};