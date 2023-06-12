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

  const isFavorite = (noteData?.is_bookmark === true);

  const toggleIsFavorite = () => {
    setNoteData(prevValue => ({
      ...prevValue,
      is_bookmark: !isFavorite
    }));
  };

  return (
    <HeaderButton
      clickHandler={toggleIsFavorite}
      cls={cn({
        [styles.isFavorite]: isFavorite
      })}
    >
      {isFavorite
        ? <AiFillStar />
        : <AiOutlineStar />}
    </HeaderButton>
  );
}

export default BookmarkButton;