import React from 'react';
import type { MouseEvent } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useContextMenu } from 'react-contexify';
import cn from 'classnames';

import {
  useCustomSearchParams,
  useNavigateWithSearch
} from '@/shared/hooks';

import type { SearchParamsOptions } from '@/shared/types';

type Props = {
  url: string,
  children: React.ReactNode,
  id: string,
  contextMenuId: string
  searchParamsOptions?: SearchParamsOptions
};

const NavItem = (props: Props) => {
  const { pathname } = useLocation();
  const { getCustomSearchParams } = useCustomSearchParams();
  const { navigateWithSearch } = useNavigateWithSearch();

  const { url, children, id, contextMenuId, searchParamsOptions = {} } = props;

  const { show } = useContextMenu({
    id: contextMenuId,
  });

  function onContextMenu(e: MouseEvent) {
    if (pathname !== url) {
      navigateWithSearch(url);
    }

    show({
      event: e,
      props: { id }
    });
  }

  function onClick(e: MouseEvent) {
    e.preventDefault();

    navigateWithSearch({
      pathname: url,
      search: getCustomSearchParams(searchParamsOptions)
    });
  }

  return (
    <li onContextMenu={
      (id && contextMenuId)
        ? onContextMenu
        : undefined
    }>
      <NavLink
        to={url}
        className={({ isActive }) =>
          cn({ 'active': isActive })
        }
        onClick={onClick}
      >
        {children}
      </NavLink>
    </li>
  );
};

export default NavItem;