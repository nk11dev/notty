import React, { useState, useEffect } from 'react';
import type { ItemParams } from 'react-contexify';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

import { FOLDER_CONTEXT_MENU_ID } from '@/app/constants/context-menu.constants';
import FolderModal from '@/entities/folder/ui/folder-modal';
import { useHandleDeleteFolder } from '@/entities/folder/hooks';
import BaseContextMenu from '@/shared/ui/controls/base-context-menu';

const FolderContextMenu = () => {
  const [isShowingModal, toggleModal] = useState(false);
  const [folderId, setFolderId] = useState(null);

  const [onDelete] = useHandleDeleteFolder();

  useEffect(() => {
    (folderId !== null) && toggleModal(true);
  }, [folderId]);

  useEffect(() => {
    (isShowingModal === false) && setFolderId(null);
  }, [isShowingModal]);

  const onItemClick = (args: ItemParams) => {
    const { id } = args.props;

    switch (args.id) {
      case 'edit':
        setFolderId(id);
        break;

      case 'delete':
        onDelete(id);
        break;
    }
  }

  const menuItems = [
    { icon: faPen, id: 'edit', text: 'Edit folder' },
    { id: 'delete', text: 'Delete folder', icon: faTrash },
  ];

  return (
    <>
      <BaseContextMenu
        menuId={FOLDER_CONTEXT_MENU_ID}
        menuItems={menuItems}
        onItemClick={onItemClick}
      />

      {isShowingModal && (
        <FolderModal
          folderId={folderId}
          onHide={() => toggleModal(false)}
        />
      )}
    </>
  );
};

export default FolderContextMenu;