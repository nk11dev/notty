import styles from './BookmarkButton.module.scss';

import React from 'react';
import cn from 'classnames';
import {
  IoBookmark,
  IoBookmarkOutline
} from 'react-icons/io5';

import { useUpdateNoteField } from '@/entities/note/hooks';
import IconButton from '@/shared/ui/controls/icon-button';

const BookmarkButton = () => {
  const [noteData, setNoteData] = useUpdateNoteField('is_bookmark');

  const isBookmark = (noteData?.is_bookmark === true);

  const onClick = () => {
    setNoteData(prevValue => ({
      ...prevValue,
      is_bookmark: !isBookmark
    }));
  };

  return (
    <IconButton
      buttonType="toolbar"
      tooltip={isBookmark
        ? 'Remove note from bookmarks'
        : 'Add note to bookmarks'
      }
      icon={isBookmark
        ? <IoBookmark />
        : <IoBookmarkOutline />}
      onClick={onClick}
      cls={cn({
        [styles.isBookmark as string]: isBookmark
      })}
    />
  );
}

export default BookmarkButton;