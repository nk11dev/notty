import React from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  AiOutlineFolder,
  AiOutlineFolderOpen
} from 'react-icons/ai';

import { SIDEBAR_NAV_QUERY_PARAM } from '@/app/constants/query-params.constants';
import ControlsButton from '@/shared/ui/controls/controls-button';

const SectionsControl = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSidebarNav = searchParams.get(SIDEBAR_NAV_QUERY_PARAM);

  const toggleSidebarNav = () => {
    const newValue = (currentSidebarNav !== null)
      ? 1 - Number(currentSidebarNav)
      : 0;

    searchParams.set(SIDEBAR_NAV_QUERY_PARAM, newValue.toString());

    setSearchParams(searchParams);
  }

  const hasSidebarNav = (currentSidebarNav !== '0');

  return (
    <ControlsButton
      clickHandler={toggleSidebarNav}
      clsIsActive={hasSidebarNav}
      tooltip={`${hasSidebarNav ? 'Hide' : 'Show'} sections`}
    >
      {
        hasSidebarNav
          ? <AiOutlineFolderOpen />
          : <AiOutlineFolder />
      }
    </ControlsButton>
  );
};

export default SectionsControl;