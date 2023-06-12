import styles from './BookmarkButton.module.scss';

import React from 'react';
import cn from 'classnames';
import {
  AiOutlineStar,
  AiFillStar
} from 'react-icons/ai';

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
        [styles.isBookmark]: isBookmark
      })}
    >
      {isBookmark
        ? <AiFillStar />
        : <AiOutlineStar />}
    </HeaderButton>
  );
}

export default BookmarkButton;