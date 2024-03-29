import React from 'react';
import type { MouseEvent } from 'react';
import { IoPersonOutline } from 'react-icons/io5';
import { useContextMenu } from 'react-contexify';

import {
  USER_CONTEXT_MENU_ID,
  USER_CONTEXT_MENU_EL_CLASSNAME,
} from '@/app/constants/context-menu.constants';
import { useVirtualKeyboard } from '@/shared/hooks';
import IconButton from '@/shared/ui/controls/icon-button';

const UserControl = () => {
  const [hideVirtualKeyboard] = useVirtualKeyboard();
  const { show, hideAll } = useContextMenu({
    id: USER_CONTEXT_MENU_ID,
  });

  function onClick(event: MouseEvent) {
    hideVirtualKeyboard(() => {
      const finded = document.getElementsByClassName(USER_CONTEXT_MENU_EL_CLASSNAME);

      const [menuEl] = [].slice.call(finded);

      if (!menuEl) {
        const controlEl = (event.target as Element).closest('button');

        const { y } = (controlEl as Element).getBoundingClientRect();

        show({
          event,
          position: { x: 42, y: (y - 120) },
        });

      } else {
        hideAll();
      }
    }, 100);
  }

  return (
    <IconButton
      buttonType="control"
      tooltip="User"
      icon={<IoPersonOutline />}
      onClick={onClick}
    />
  );
}

export default UserControl;