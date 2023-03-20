import './SectionsContextMenu.scss';

import React from 'react';
import { Menu, Item } from 'react-contexify';
import type { MenuId, ItemParams } from 'react-contexify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import {
  useDeleteSectionMutation
} from '@/entities/section/api-slices';

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

  const handleItemClick = (args: ItemParams) => {
    switch (args.id) {
      case 'delete':
        deleteSection(args.props.sectionId)
        break;
    }
  }

  const menuItems = [
    { id: 'delete', text: 'Delete section', icon: faTrash },
  ];

  return (
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
  );
};

export default SectionsContextMenu;