import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoExitOutline } from 'react-icons/io5';

import { USER_CONTEXT_MENU_ID } from '@/app/constants/context-menu.constants';
import BaseContextMenu from '@/shared/ui/controls/base-context-menu';

const UserContextMenu = () => {
  const navigate = useNavigate();

  const onLogout = () => {
    navigate('/login')
  }

  const menuItems = [
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
      onItemClick={onLogout}
    />
  );
};

export default UserContextMenu;