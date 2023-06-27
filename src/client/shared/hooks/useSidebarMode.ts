import { useSearchParams } from 'react-router-dom';

import { SIDEBAR_MODE_QUERY_PARAM } from '@/app/constants/query-params.constants';
import { SidebarModesMap } from '@/app/enums/query-params.enums';

export const useSidebarMode = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sidebarMode = searchParams.get(SIDEBAR_MODE_QUERY_PARAM);

  const setSidebarMode = (mode: SidebarModesMap) => {
    searchParams.set(SIDEBAR_MODE_QUERY_PARAM, mode);
    setSearchParams(searchParams);
  };

  return {
    sidebarMode,
    setSidebarMode,
    isSidebarVisible: (sidebarMode !== SidebarModesMap.HIDDEN),
    isFoldersModeOrNull: [SidebarModesMap.FOLDERS, null].includes(sidebarMode as SidebarModesMap)
  };
};