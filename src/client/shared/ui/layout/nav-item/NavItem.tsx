import React, { useRef } from 'react';
import type { MouseEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { useContextMenu } from 'react-contexify';
import cn from 'classnames';

import { NAV_CONTEXT_MENU_ID } from '@/app/constants/context-menu.constants';

type Props = {
  url: string,
  id: number,
  title: string
};

const NavItem = ({ url, id, title }: Props) => {
  const itemRef = useRef(null);
  const linkRef = useRef(null);

  const { show } = useContextMenu({
    id: NAV_CONTEXT_MENU_ID,
  });

  function handleContextMenu(event: MouseEvent) {
    const itemId = itemRef.current.getAttribute('data-item-id');
    const itemTitle = linkRef.current.innerHTML;

    show({
      event,
      props: {
        id: itemId,
        title: itemTitle,
      }
    });
  }

  return (
    <li
      ref={itemRef}
      data-item-id={id}
      onContextMenu={handleContextMenu}
    >
      <NavLink
        ref={linkRef}
        to={url}
        className={({ isActive }) =>
          cn({ 'active': isActive })
        }
      >
        {title}
      </NavLink>
    </li>
  );
};

export default NavItem;