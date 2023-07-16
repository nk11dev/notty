import styles from './BaseContextMenu.module.scss';

import React, { cloneElement } from 'react';
import type { ReactNode, ReactElement } from 'react';
import { Menu, Item } from 'react-contexify';
import type { MenuId, ItemParams } from 'react-contexify';
import cn from 'classnames';

type MenuItem = {
  id: string,
  text?: string,
  icon?: ReactNode,
  component?: ReactNode,
  isDisabled?: boolean,
};

type Props = {
  menuId: MenuId,
  menuItems: MenuItem[],
  onItemClick: (args: ItemParams) => void;
  cls?: string,
};

const BaseContextMenu = (props: Props) => {
  const { menuId, menuItems, onItemClick, cls } = props;

  return (
    <Menu
      id={menuId}
      className={cn(styles.contextMenu, cls)}
      animation="fade"
    >
      {menuItems.map((item: MenuItem, index: number) => (
        <Item
          key={index}
          id={item.id}
          onClick={onItemClick}
          disabled={!!item.isDisabled}
        >
          {(item.text && item.icon) && <>
            <span className={styles.itemIconWrapper}>
              {cloneElement(item.icon as ReactElement, {
                className: styles.itemIcon,
              })}
            </span>

            <span className={styles.itemText}>
              {item.text}
            </span>
          </>}

          {item.component && cloneElement(
            item.component as ReactElement
          )}
        </Item>
      ))}
    </Menu>
  );
};

export default BaseContextMenu;