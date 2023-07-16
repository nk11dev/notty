import React, { useState, useEffect } from 'react';
import type { ItemParams } from 'react-contexify';
import { PiTrash } from 'react-icons/pi';
import { GoPencil } from 'react-icons/go';

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
    {
      id: 'edit',
      text: 'Edit folder',
      icon: <GoPencil style={{
        width: '20px',
        height: '20px',
      }} />
    },
    {
      id: 'delete',
      text: 'Delete folder',
      icon: <PiTrash style={{
        width: '22px',
        height: '22px',
      }} />
    },
  ];

  return (
    <>
      <BaseContextMenu
        menuId={FOLDER_CONTEXT_MENU_ID}
        menuItems={menuItems}
        onItemClick={onItemClick}
      />

      {(folderId !== null && isShowingModal)
        ? (
          <FolderModal
            folderId={folderId}
            onHide={() => toggleModal(false)}
          />
        )
        : null}
    </>
  );
};

export default FolderContextMenu;