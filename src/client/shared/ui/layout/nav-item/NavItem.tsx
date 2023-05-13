import React, { useRef } from 'react';
import type { MouseEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { useContextMenu } from 'react-contexify';
import cn from 'classnames';

type Props = {
  url: string,
  id: number,
  title: string,
  contextMenuId: string
};

const NavItem = (props: Props) => {
  const { url, id, title, contextMenuId } = props;

  const itemRef = useRef(null);
  const linkRef = useRef(null);

  const { show } = useContextMenu({
    id: contextMenuId,
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