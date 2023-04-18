import styles from '@/shared/ui/layout/sidebar-toolbar/SidebarToolbar.module.scss';

import React from 'react';
import { faRotate, faPlus } from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';

import {
  useLazyGetAllSectionsQuery,
  useCreateSectionMutation
} from '@/entities/section/api-slices';

import SidebarToolbar from '@/shared/ui/layout/sidebar-toolbar';
import ButtonIcon from '@/shared/ui/controls/button-icon';

const SectionsToolbar = () => {
  const [refetchAllSections] = useLazyGetAllSectionsQuery();
  const [createSection] = useCreateSectionMutation();

  return (
    <SidebarToolbar>
      <b>Sections</b>

      <ButtonIcon
        size={16}
        icon={faPlus}
        cls={cn(styles.toolbarBtn, 'm-1')}
        clickHandler={() => createSection()}
      />

      <ButtonIcon
        size={16}
        icon={faRotate}
        cls={cn(styles.toolbarBtn, 'm-1')}
        clickHandler={() => refetchAllSections()}
      />
    </SidebarToolbar>
  );
}

export default SectionsToolbar;