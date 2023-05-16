import React from 'react';
import type { MouseEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { useContextMenu } from 'react-contexify';
import cn from 'classnames';

import { useNavigateWithSearch } from '@/shared/hooks';

type Props = {
  url: string,
  children: React.ReactNode,
  id?: number,
  contextMenuId?: string
};

const NavItem = (props: Props) => {
  const { url, children, id, contextMenuId } = props;

  const { search, navigateWithSearch } = useNavigateWithSearch();

  const { show } = useContextMenu({
    id: contextMenuId,
  });

  function handleContextMenu(event: MouseEvent) {
    navigateWithSearch(url);
    show({ event, props: { id } });
  }

  return (
    <li onContextMenu={
      (id && contextMenuId)
        ? handleContextMenu
        : undefined
    }>
      <NavLink
        to={url + search}
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