import React, { useRef } from 'react';
import type { MouseEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { useContextMenu } from 'react-contexify';
import cn from 'classnames';

import { SECTIONS_CONTEXT_MENU_ID } from '@/app/constants/context-menu.constants';

type Props = {
  url: string,
  id: number,
  title: string
};

const SectionItem = ({ url, id, title }: Props) => {
  const listItemRef = useRef(null);
  const linkRef = useRef(null);

  const { show } = useContextMenu({
    id: SECTIONS_CONTEXT_MENU_ID,
  });

  function handleContextMenu(event: MouseEvent) {
    const sectionId = listItemRef.current.getAttribute('data-section-id');
    const sectionTitle = linkRef.current.getAttribute('innerHTML');

    show({
      event,
      props: {
        sectionId,
        sectionTitle,
      }
    });
  }

  return (
    <li
      ref={listItemRef}
      data-section-id={id}
      onContextMenu={handleContextMenu}
    >
      <NavLink
        ref={linkRef}
        to={url}
        className={({ isActive }) =>
          cn({ 'active': isActive })
        }
      >
        {title}
      </NavLink>
    </li>
  );
};

export default SectionItem;