import styles from './NavContextMenu.module.scss';

import React from 'react';
import { Menu, Item } from 'react-contexify';
import type { MenuId, ItemParams } from 'react-contexify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type MenuItem = {
  id: string,
  text: string,
  icon: IconDefinition,
};

type Props = {
  menuId: MenuId,
  menuItems: MenuItem[],
  onItemClick: (args: ItemParams) => void;
};

const NavContextMenu = (props: Props) => {
  const { menuId, menuItems, onItemClick } = props;

  return (
    <>
      <Menu
        id={menuId}
        className={styles.contextMenu}
        animation="fade"
      >
        {menuItems.map((item: MenuItem, index: number) => (
          <Item
            key={index}
            id={item.id}
            onClick={onItemClick}
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
    </>
  );
};

export default NavContextMenu;