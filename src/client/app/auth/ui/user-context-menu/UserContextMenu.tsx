import styles from '@/app/auth/ui/user-panel/UserPanel.module.scss';

import React from 'react';
import { useAppDispatch } from '@/app/redux/store';
import { IoExitOutline } from 'react-icons/io5';
import type { ItemParams } from 'react-contexify';

import { logoutUser } from '@/app/auth/slices';
import {
  USER_CONTEXT_MENU_ID,
  USER_CONTEXT_MENU_EL_CLASSNAME,
} from '@/app/constants/context-menu.constants';
import UserPanel from '@/app/auth/ui/user-panel';
import BaseContextMenu from '@/shared/ui/controls/base-context-menu';

const UserContextMenu = () => {
  const dispatch = useAppDispatch()

  const onItemClick = (args: ItemParams) => {
    switch (args.id) {
      case 'logout':
        dispatch(logoutUser());
        break;
    }
  }

  const menuItems = [
    {
      id: 'info',
      component: <UserPanel />,
      isDisabled: true,
      cls: styles.item
    },
    {
      id: 'logout',
      text: 'Log out',
      icon: <IoExitOutline style={{
        width: '24px',
        height: '24px',
      }} />
    },
  ];

  return (
    <BaseContextMenu
      menuId={USER_CONTEXT_MENU_ID}
      menuItems={menuItems}
      onItemClick={onItemClick}
      cls={USER_CONTEXT_MENU_EL_CLASSNAME}
    />
  );
};

export default UserContextMenu;