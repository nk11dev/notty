import styles from './BookmarkButton.module.scss';

import React from 'react';
import cn from 'classnames';
import {
  IoBookmark,
  IoBookmarkOutline
} from 'react-icons/io5';

import { useUpdateNoteField } from '@/entities/note/hooks';
import HeaderButton from '@/shared/ui/controls/header-button';

const BookmarkButton = () => {
  const [noteData, setNoteData] = useUpdateNoteField('is_bookmark');

  const isBookmark = (noteData?.is_bookmark === true);

  const toggleIsBookmark = () => {
    setNoteData(prevValue => ({
      ...prevValue,
      is_bookmark: !isBookmark
    }));
  };

  return (
    <HeaderButton
      clickHandler={toggleIsBookmark}
      cls={cn({
        [styles.isBookmark as string]: isBookmark
      })}
    >
      {isBookmark
        ? <IoBookmark />
        : <IoBookmarkOutline />}
    </HeaderButton>
  );
}

export default BookmarkButton;