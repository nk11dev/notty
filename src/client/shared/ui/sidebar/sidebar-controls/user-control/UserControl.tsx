import React from 'react';
import type { MouseEvent } from 'react';
import { IoPersonOutline } from 'react-icons/io5';
import { useContextMenu } from 'react-contexify';

import { USER_CONTEXT_MENU_ID } from '@/app/constants/context-menu.constants';
import ControlsButton from '@/shared/ui/controls/controls-button';

const UserControl = () => {
  const { show } = useContextMenu({
    id: USER_CONTEXT_MENU_ID,
  });

  function onClick(event: MouseEvent) {
    const { target } = event;
    const { y } = (target as Element).getBoundingClientRect();

    show({
      event,
      position: {
        x: 40,
        y: y - 40
      },
    });
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