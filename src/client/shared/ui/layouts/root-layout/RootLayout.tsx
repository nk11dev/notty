import styles from './RootLayout.module.scss';

import React from 'react';
import { useParams, Outlet } from 'react-router-dom';
import cn from 'classnames';

import FolderContextMenu from '@/entities/folder/ui/folder-context-menu';
import NoteContextMenu from '@/entities/note/ui/note-context-menu';
import { useSidebarMode } from '@/shared/hooks';
import SidebarControls from '@/shared/ui/sidebar/sidebar-controls';
import SidebarLayout from '@/shared/ui/layouts/sidebar-layout';

type Props = {
  children?: React.ReactNode,
};

const RootLayout = (props: Props) => {
  const { folderSlug } = useParams();
  const { isFoldersModeOrNull, isSidebarVisible } = useSidebarMode();

  const isDoubleColumnLayout = (isFoldersModeOrNull && folderSlug);

  return (
    <div className={cn(styles.layout, {
      'single-column-layout': !isDoubleColumnLayout,
      'double-column-layout': isDoubleColumnLayout,
      [styles['sidebar-is-visible']]: isSidebarVisible,
      [styles['sidebar-is-hidden']]: !isSidebarVisible,
    })}>
      <SidebarControls />

      <aside className={styles.sidebar}>
        <SidebarLayout />
      </aside>

      <main className={styles.main}>
        {
          props.children
            ? props.children
            : <Outlet />
        }
      </main>

      <FolderContextMenu />
      <NoteContextMenu />
    </div>
  );
};

export default RootLayout;