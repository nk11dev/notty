import React from 'react';
import type { MouseEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { useContextMenu } from 'react-contexify';
import cn from 'classnames';

type Props = {
  url: string,
  id: number,
  contextMenuId: string,
  children: React.ReactNode
};

const NavItem = (props: Props) => {
  const { url, id, contextMenuId, children } = props;

  const { show } = useContextMenu({
    id: contextMenuId,
  });

  function handleContextMenu(event: MouseEvent) {
    show({ event, props: { id } });
  }

  return (
    <li onContextMenu={handleContextMenu}>
      <NavLink
        to={url}
        className={({ isActive }) =>
          cn({ 'active': isActive })
        }
      >
        {children}
      </NavLink>
    </li>
  );
};

export default NavItem;