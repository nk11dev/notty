import React from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  AiOutlineFolder,
  AiOutlineFolderOpen
} from 'react-icons/ai';

import { SIDEBAR_MODE_QUERY_PARAM } from '@/app/constants/query-params.constants';
import ControlsButton from '@/shared/ui/controls/controls-button';

const SectionsControl = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSidebarMode = searchParams.get(SIDEBAR_MODE_QUERY_PARAM);

  const toggleSidebarMode = () => {
    const newValue = (currentSidebarMode !== null)
      ? 1 - Number(currentSidebarMode)
      : 0;

    searchParams.set(SIDEBAR_MODE_QUERY_PARAM, newValue.toString());

    setSearchParams(searchParams);
  }

  const sidebarIsVisible = (currentSidebarMode !== '0');

  return (
    <ControlsButton
      clickHandler={toggleSidebarMode}
      clsIsActive={sidebarIsVisible}
      tooltip={`${sidebarIsVisible ? 'Hide' : 'Show'} sections`}
    >
      {
        sidebarIsVisible
          ? <AiOutlineFolderOpen />
          : <AiOutlineFolder />
      }
    </ControlsButton>
  );
};

export default SectionsControl;