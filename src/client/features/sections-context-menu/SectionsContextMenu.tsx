import React, { useState } from 'react';
import type { ItemParams } from 'react-contexify';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

import { SECTIONS_CONTEXT_MENU_ID } from '@/app/constants/context-menu.constants';
import SectionModal from '@/features/section-modal';
import { useDeleteSectionMutation } from '@/entities/section/api-slices';
import NavContextMenu from '@/shared/ui/layout/nav-context-menu';
import useModal from '@/shared/hooks/useModal';

const SectionsContextMenu = () => {
  const { isShowing, toggleModal } = useModal();
  const [modalData, setModalData] = useState(null);
  const [deleteSection] = useDeleteSectionMutation();

  const onItemClick = (args: ItemParams) => {
    const { id, title } = args.props;

    switch (args.id) {
      case 'edit':
        setModalData({ id, title });
        toggleModal();
        break;

      case 'delete':
        deleteSection(id);
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

      <SectionModal
        data={modalData}
        isShowing={isShowing}
        onHide={toggleModal}
      />
    </>
  );
};

export default SectionsContextMenu;