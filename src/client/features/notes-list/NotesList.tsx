import React from 'react';
import { useLocation, useParams, NavLink } from 'react-router-dom';
import cn from 'classnames';

import { useGetNotesBySectionQuery } from '@/entities/note/api-slices';
import type { Note } from '@/entities/note/types';
import SidebarList from '@/shared/ui/layout/sidebar-list';
import LoadingMsg from '@/shared/ui/fetching/loading-msg';
import ErrorMsg from '@/shared/ui/fetching/error-msg';

const NotesList = () => {
  const { search: queryParams } = useLocation();
  const { sectionId } = useParams();

  const {
    data,
    isFetching,
    isError,
    error
  } = useGetNotesBySectionQuery(sectionId, {
    skip: !sectionId,
    refetchOnMountOrArgChange: true
  });

  if (isFetching) return <LoadingMsg />;

  if (isError) return <ErrorMsg error={error} />;

  if (!data || data?.length <= 0) return null;

  return (
    <SidebarList>
      {data.map((item: Note, index: number) => (
        <li key={index}>
          <NavLink
            to={`/sections/${item.section_id}/notes/${item.note_id}/${queryParams}`}
            className={({ isActive }) =>
              cn({ 'active': isActive })
            }
          >
            {item.title}
          </NavLink>
        </li>
      ))}
    </SidebarList>
  );
}

export default NotesList;