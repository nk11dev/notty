import React, { useRef } from 'react';
import type { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useContextMenu } from 'react-contexify';

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
    const sectionTitle = linkRef.current.getInnerHTML();

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
      <Link
        ref={linkRef}
        to={url}
      >
        {title}
      </Link>
    </li>
  );
};

export default SectionItem;