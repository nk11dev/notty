import React, { useState, useEffect } from 'react';
import type { ItemParams } from 'react-contexify';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

import { FOLDER_CONTEXT_MENU_ID } from '@/app/constants/context-menu.constants';
import SectionModal from '@/entities/section/ui/section-modal';
import { useHandleDeleteSection } from '@/entities/section/hooks';
import BaseContextMenu from '@/shared/ui/controls/base-context-menu';

const SectionContextMenu = () => {
  const [isShowingModal, toggleModal] = useState(false);
  const [folderId, setFolderId] = useState(null);

  const [onDeleteSection] = useHandleDeleteSection();

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
        onDeleteSection(id);
        break;
    }
  }

  const menuItems = [
    { icon: faPen, id: 'edit', text: 'Edit section' },
    { id: 'delete', text: 'Delete section', icon: faTrash },
  ];

  return (
    <>
      <BaseContextMenu
        menuId={FOLDER_CONTEXT_MENU_ID}
        menuItems={menuItems}
        onItemClick={onItemClick}
      />

      {isShowingModal && (
        <SectionModal
          folderId={folderId}
          onHide={() => toggleModal(false)}
        />
      )}
    </>
  );
};

export default SectionContextMenu;