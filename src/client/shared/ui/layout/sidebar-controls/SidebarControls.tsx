import styles from './SidebarControls.module.scss';

import React from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { faList } from '@fortawesome/free-solid-svg-icons';

import { SIDEBAR_NAV_QUERY_PARAM } from '@/app/constants/query-params.constants';
import ButtonIcon from '@/shared/ui/controls/button-icon';

const SidebarControls = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSidebarNav = searchParams.get(SIDEBAR_NAV_QUERY_PARAM);

  const toggleSidebarNav = () => {
    const newValue = (currentSidebarNav !== null)
      ? 1 - Number(currentSidebarNav)
      : 0;

    setSearchParams({
      [SIDEBAR_NAV_QUERY_PARAM]: newValue.toString()
    });
  }

  const hasSidebarNav = (currentSidebarNav !== '0');

  return (
    <aside className={styles.controls}>
      <ButtonIcon
        icon={faList}
        clickHandler={() => toggleSidebarNav()}
        cls={cn(styles.controlsBtn, {
          [styles.isActive]: hasSidebarNav
        })}
        size={24}
        tooltip={`${hasSidebarNav ? 'Hide' : 'Show'} navigation`}
      />
    </aside>
  )
};

export default SidebarControls;