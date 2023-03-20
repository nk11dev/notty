import './SectionsContextMenu.scss';

import React, { useState } from 'react';
import { Menu, Item } from 'react-contexify';
import type { MenuId, ItemParams } from 'react-contexify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import { useDeleteSectionMutation } from '@/entities/section/api-slices';

import SectionModal from '@/features/section-modal';
import useModal from '@/shared/hooks/useModal';

type Props = {
  menuId: MenuId
};

type MenuItemProps = {
  id: string,
  text: string,
  icon: IconDefinition,
};

const SectionsContextMenu = (
  { menuId }: Props
) => {

  const [deleteSection] = useDeleteSectionMutation();
  const { isShowing, toggleModal } = useModal();

  const [sectionData, setSectionData] = useState(null);

  const handleItemClick = (args: ItemParams) => {
    switch (args.id) {
      case 'edit':
        setSectionData(args.props);
        toggleModal();
        break;

      case 'delete':
        deleteSection(args.props.sectionId)
        break;
    }
  }

  const menuItems = [
    { icon: faPen, id: 'edit', text: 'Edit section' },
    { id: 'delete', text: 'Delete section', icon: faTrash },
  ];

  return (
    <>
      <Menu
        id={menuId}
        className="sections-context-menu"
        animation="fade"
      >
        {menuItems.map((item: MenuItemProps, index: number) => (
          <Item
            key={index}
            id={item.id}
            onClick={handleItemClick}
          >
            <span>
              <FontAwesomeIcon
                icon={item.icon}
                style={{ width: 16, height: 16 }}
              />
            </span>
            <span className="mx-1">
              {item.text}
            </span>
          </Item>
        ))}
      </Menu>

      <SectionModal
        data={sectionData}
        isShowing={isShowing}
        onHide={toggleModal}
      />
    </>
  );
};

export default SectionsContextMenu;