import styles from './SidebarControls.module.scss';

import React from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { faList } from '@fortawesome/free-solid-svg-icons';

import { SIDEBAR_NAV_QUERY_PARAM } from '@/app/constants/query-params.constants';
import ButtonIcon from '@/shared/ui/controls/button-icon';

const SidebarControls = () => {
  const [currentQueryParams, setQueryParams] = useSearchParams();

  const currentSidebarNav = currentQueryParams.get(SIDEBAR_NAV_QUERY_PARAM);

  const toggleSidebarNav = () => {
    const newValue = (currentSidebarNav !== null)
      ? 1 - Number(currentSidebarNav)
      : 0;

    setQueryParams({
      [SIDEBAR_NAV_QUERY_PARAM]: newValue.toString()
    });
  }

  return (
    <aside className={styles.controls}>
      <ButtonIcon
        cls={cn(styles.controlsBtn, {
          [styles.isActive]: (currentSidebarNav !== '0')
        })}
        icon={faList}
        size={24}
        clickHandler={() => toggleSidebarNav()}
      />
    </aside>
  )
};

export default SidebarControls;