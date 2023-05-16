import React, { useState, useEffect } from 'react';
import type { ItemParams } from 'react-contexify';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

import { SECTIONS_CONTEXT_MENU_ID } from '@/app/constants/context-menu.constants';
import SectionModal from '@/features/section-modal';
import { useDeleteSectionMutation } from '@/entities/section/api-slices';
import { useNavigateWithSearch } from '@/shared/hooks';
import NavContextMenu from '@/shared/ui/layout/nav-context-menu';

const SectionsContextMenu = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [sectionId, setSectionId] = useState(null);

  const { navigateWithSearch } = useNavigateWithSearch();

  const [deleteSection] = useDeleteSectionMutation();

  useEffect(() => {
    (sectionId !== null) && setIsShowing(true);
  }, [sectionId]);

  useEffect(() => {
    (isShowing === false) && setSectionId(null);
  }, [isShowing]);

  const onDeleteSection = async (id: string) => {
    const result = await deleteSection(id);

    if ('data' in result) {
      const { data } = result;
      const { lastRow } = data;

      if (lastRow !== null) {
        navigateWithSearch(`/sections/${lastRow.section_id}`);
      }
    }
  }

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