import styles from './SidebarControls.module.scss';

import React from 'react';
import { faList } from '@fortawesome/free-solid-svg-icons';

import ButtonIcon from '@/shared/ui/controls/button-icon';

const SidebarControls = () => {

  const toggleSidebar = () => {
    console.log('toggleSidebar()');
  }

  return (
    <aside className={styles.controls}>
      <ButtonIcon
        cls={styles.controlsBtn}
        icon={faList}
        size={24}
        clickHandler={() => toggleSidebar()}
      />
    </aside>
  )
};

export default SidebarControls;