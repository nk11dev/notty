import React, { useState, useEffect } from 'react';
import type { ItemParams } from 'react-contexify';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

import { SECTIONS_CONTEXT_MENU_ID } from '@/app/constants/context-menu.constants';
import SectionModal from '@/features/section-modal';
import { useHandleDeleteSection } from '@/entities/section/hooks';
import NavContextMenu from '@/shared/ui/layout/nav-context-menu';

const SectionsContextMenu = () => {
  const [isShowingModal, toggleModal] = useState(false);
  const [sectionId, setSectionId] = useState(null);

  const [onDeleteSection] = useHandleDeleteSection();

  useEffect(() => {
    (sectionId !== null) && toggleModal(true);
  }, [sectionId]);

  useEffect(() => {
    (isShowingModal === false) && setSectionId(null);
  }, [isShowingModal]);

  const onItemClick = (args: ItemParams) => {
    const { id } = args.props;

    switch (args.id) {
      case 'edit':
        setSectionId(id);
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
      <NavContextMenu
        menuId={SECTIONS_CONTEXT_MENU_ID}
        menuItems={menuItems}
        onItemClick={onItemClick}
      />

      {isShowingModal && (
        <SectionModal
          sectionId={sectionId}
          onHide={() => toggleModal(false)}
        />
      )}
    </>
  );
};

export default SectionsContextMenu;