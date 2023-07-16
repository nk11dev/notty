import React from 'react';
import type { ItemParams } from 'react-contexify';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { NOTE_CONTEXT_MENU_ID } from '@/app/constants/context-menu.constants';
import { useHandleDeleteNote } from '@/entities/note/hooks';
import BaseContextMenu from '@/shared/ui/controls/base-context-menu';

const NoteContextMenu = () => {
  const [onDeleteNote] = useHandleDeleteNote();

  const onItemClick = (args: ItemParams) => {
    const { id } = args.props;
    onDeleteNote(id);
  }

  const menuItems = [
    { id: 'delete', text: 'Delete note', icon: faTrash },
  ];

  return (
    <BaseContextMenu
      menuId={NOTE_CONTEXT_MENU_ID}
      menuItems={menuItems}
      onItemClick={onItemClick}
    />
  );
};

export default NoteContextMenu;