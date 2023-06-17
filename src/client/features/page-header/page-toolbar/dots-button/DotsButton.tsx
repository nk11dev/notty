import React from 'react';
import type { MouseEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useContextMenu } from 'react-contexify';
import { IoEllipsisHorizontal } from 'react-icons/io5';

import { NOTES_CONTEXT_MENU_ID } from '@/app/constants/context-menu.constants';
import HeaderButton from '@/shared/ui/controls/header-button';

const DotsButton = () => {
  const { noteId } = useParams();

  const { show } = useContextMenu({
    id: NOTES_CONTEXT_MENU_ID,
  });

  const onClick = (e: MouseEvent) => {
    show({
      event: e,
      props: {
        id: noteId
      }
    });
  }

  return (
    <HeaderButton clickHandler={onClick}>
      <IoEllipsisHorizontal />
    </HeaderButton>
  );
}

export default DotsButton;