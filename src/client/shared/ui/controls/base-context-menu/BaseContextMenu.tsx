import styles from './BaseContextMenu.module.scss';

import React, { cloneElement } from 'react';
import type { ReactNode, ReactElement } from 'react';
import { Menu, Item } from 'react-contexify';
import type { MenuId, ItemParams } from 'react-contexify';

type MenuItem = {
  id: string,
  text: string,
  icon: ReactNode,
};

type Props = {
  menuId: MenuId,
  menuItems: MenuItem[],
  onItemClick: (args: ItemParams) => void;
};

const BaseContextMenu = (props: Props) => {
  const { menuId, menuItems, onItemClick } = props;

  return (
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
          <span className={styles.itemIconWrapper}>
            {cloneElement(item.icon as ReactElement, {
              className: styles.itemIcon,
            })}
          </span>

          <span className={styles.itemText}>
            {item.text}
          </span>
        </Item>
      ))}
    </Menu>
  );
};

export default BaseContextMenu;