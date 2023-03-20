import React from 'react';
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

  const { show } = useContextMenu({
    id: SECTIONS_CONTEXT_MENU_ID,
  });

  function handleContextMenu(event: MouseEvent) {
    const target = event.target as HTMLTextAreaElement;
    const listItem = target.closest('li');
    const sectionId = listItem.getAttribute('data-section-id');

    show({
      event,
      props: { sectionId }
    });
  }

  return (
    <li
      data-section-id={id}
      onContextMenu={handleContextMenu}
    >
      <Link to={url}>
        {title}
      </Link>
    </li>
  );
};

export default SectionItem;