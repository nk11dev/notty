import React from 'react';
import type { MouseEvent } from 'react';
import { IoPersonOutline } from 'react-icons/io5';
import { useContextMenu } from 'react-contexify';

import {
  USER_CONTEXT_MENU_ID,
  USER_CONTEXT_MENU_EL_CLASSNAME,
} from '@/app/constants/context-menu.constants';
import ControlsButton from '@/shared/ui/controls/controls-button';

const UserControl = () => {
  const { show, hideAll } = useContextMenu({
    id: USER_CONTEXT_MENU_ID,
  });

  function onClick(event: MouseEvent) {
    const finded = document.getElementsByClassName(USER_CONTEXT_MENU_EL_CLASSNAME);

    const [menuEl] = [].slice.call(finded);

    if (!menuEl) {
      const controlEl = (event.target as Element).closest('span');

      const { y } = (controlEl as Element).getBoundingClientRect();

      show({
        event,
        position: { x: 42, y: (y - 120) },
      });

    } else {
      hideAll();
    }
  }

  return (
    <ControlsButton
      clickHandler={onClick}
      tooltip="User"
    >
      <IoPersonOutline />
    </ControlsButton>
  );
}

export default UserControl;