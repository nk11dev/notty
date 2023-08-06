import React from 'react';
import type { MouseEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useContextMenu } from 'react-contexify';
import { IoEllipsisHorizontal } from 'react-icons/io5';

import {
  NOTE_CONTEXT_MENU_ID,
  NOTE_CONTEXT_MENU_EL_CLASSNAME,
} from '@/app/constants/context-menu.constants';
import HeaderButton from '@/shared/ui/controls/header-button';

const DotsButton = () => {
  const { noteSlug } = useParams();

  const { show, hideAll } = useContextMenu({
    id: NOTE_CONTEXT_MENU_ID,
  });

  const tooltips = {
    menuVisible: 'Hide note context menu',
    menuHidden: 'Show note context menu',
  };

  const onClick = (event: MouseEvent) => {
    const finded = document.getElementsByClassName(NOTE_CONTEXT_MENU_EL_CLASSNAME);
    const [menuEl] = [].slice.call(finded);

    const controlEl = (event.target as Element).closest('span') as Element;

    const menuCurrentPos = (menuEl as Element)?.getBoundingClientRect();
    const controlPosition = controlEl.getBoundingClientRect();

    const menuNewPos = {
      x: (controlPosition.x - 107),
      y: 45
    };

    if (!menuEl || (
      (menuCurrentPos?.x !== menuNewPos.x) &&
      (menuCurrentPos?.y !== menuNewPos.y)
    )) {
      show({
        event,
        position: menuNewPos,
        props: {
          id: noteSlug
        }
      });
      controlEl.setAttribute('title', tooltips.menuVisible);

    } else {
      hideAll();
      controlEl.setAttribute('title', tooltips.menuHidden);
    }

  }

  return (
    <HeaderButton
      clickHandler={onClick}
      tooltip={tooltips.menuHidden}
    >
      <IoEllipsisHorizontal />
    </HeaderButton>
  );
}

export default DotsButton;