import React from 'react';
import type { ItemParams } from 'react-contexify';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { NOTES_CONTEXT_MENU_ID } from '@/app/constants/context-menu.constants';
import { useDeleteNoteMutation } from '@/entities/note/api-slices';
import NavContextMenu from '@/shared/ui/layout/nav-context-menu';

const NotesContextMenu = () => {
  const [deleteNote] = useDeleteNoteMutation();

  const onItemClick = (args: ItemParams) => {
    const { id } = args.props;
    deleteNote(id);
  }

  const menuItems = [
    { id: 'delete', text: 'Delete note', icon: faTrash },
  ];

  return (
    <NavContextMenu
      menuId={NOTES_CONTEXT_MENU_ID}
      menuItems={menuItems}
      onItemClick={onItemClick}
    />
  );
};

export default NotesContextMenu;