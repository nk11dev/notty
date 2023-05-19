import styles from '@/shared/ui/layout/sidebar-toolbar/SidebarToolbar.module.scss';

import React from 'react';
import { faRotate, faPlus } from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';

import { useLazyGetAllSectionsQuery } from '@/entities/section/api-slices';
import { useHandleCreateSection } from '@/entities/section/hooks';

import SidebarToolbar from '@/shared/ui/layout/sidebar-toolbar';
import ButtonIcon from '@/shared/ui/controls/button-icon';

const SectionsToolbar = () => {
  const [refetchAllSections] = useLazyGetAllSectionsQuery();
  const [onCreateSection] = useHandleCreateSection();

  return (
    <SidebarToolbar title="Sections">
      <ButtonIcon
        icon={faPlus}
        clickHandler={() => onCreateSection()}
        cls={cn(styles.toolbarBtn, 'm-1')}
        size={16}
        tooltip="Create section"
      />

      <ButtonIcon
        icon={faRotate}
        clickHandler={() => refetchAllSections()}
        cls={cn(styles.toolbarBtn, 'm-1')}
        size={16}
        tooltip="Refetch sections"
      />
    </SidebarToolbar>
  );
}

export default SectionsToolbar;