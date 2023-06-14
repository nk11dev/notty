import React from 'react';
import type { ItemParams } from 'react-contexify';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { NOTES_CONTEXT_MENU_ID } from '@/app/constants/context-menu.constants';
import { useHandleDeleteNote } from '@/entities/note/hooks';
import NavContextMenu from '@/shared/ui/sidebar/nav-context-menu';

const NotesContextMenu = () => {
  const [onDeleteNote] = useHandleDeleteNote();

  const onItemClick = (args: ItemParams) => {
    const { id } = args.props;
    onDeleteNote(id);
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