import React from 'react';
import { useParams } from 'react-router-dom';

import { SidebarModesMap } from '@/app/enums/query-params.enums';
import { useSidebarMode } from '@/shared/hooks';

import SidebarColumn from '@/shared/ui/sidebar/sidebar-column';
import {
  SidebarSectionsWidget,
  SidebarNotesWidget,
  SidebarBookmarksWidget,
} from '@/widgets/sidebar-widgets';

const SidebarLayout = () => {
  const { sectionId } = useParams();
  const { isSectionsModeOrNull, sidebarMode } = useSidebarMode();

  const isDoubleColumnLayout = (isSectionsModeOrNull && sectionId);

  const renderLeftColumnWidgets = () => {
    switch (sidebarMode) {
      case null:
      case SidebarModesMap.SECTIONS:
        return <SidebarSectionsWidget />;

      case SidebarModesMap.BOOKMARKS:
        return <SidebarBookmarksWidget />;

      default:
        return null
    }
  }

  // render sidebar columns markup in advance because of more smooth animation purposes
  return (
    <>
      <SidebarColumn style={{ zIndex: 2 }}>
        {renderLeftColumnWidgets()}
      </SidebarColumn>

      <SidebarColumn
        style={{ zIndex: 1 }}
        isHidden={!isDoubleColumnLayout}
      >
        {isDoubleColumnLayout && <SidebarNotesWidget />}
      </SidebarColumn>
    </>
  );
}

export default SidebarLayout;