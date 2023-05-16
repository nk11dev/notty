import React, { useState, useEffect } from 'react';
import type { ItemParams } from 'react-contexify';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

import { SECTIONS_CONTEXT_MENU_ID } from '@/app/constants/context-menu.constants';
import SectionModal from '@/features/section-modal';
import { useHandleDeleteSection } from '@/entities/section/hooks';
import NavContextMenu from '@/shared/ui/layout/nav-context-menu';

const SectionsContextMenu = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [sectionId, setSectionId] = useState(null);

  const [onDeleteSection] = useHandleDeleteSection();

  useEffect(() => {
    (sectionId !== null) && setIsShowing(true);
  }, [sectionId]);

  useEffect(() => {
    (isShowing === false) && setSectionId(null);
  }, [isShowing]);

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

      {isShowing && (
        <SectionModal
          sectionId={sectionId}
          onHide={() => setIsShowing(false)}
        />
      )}
    </>
  );
};

export default SectionsContextMenu;