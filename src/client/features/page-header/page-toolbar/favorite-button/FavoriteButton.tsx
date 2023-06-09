import styles from './FavoriteButton.module.scss';

import React from 'react';
import cn from 'classnames';
import {
  AiOutlineStar,
  AiFillStar
} from 'react-icons/ai';

import { useUpdateNoteField } from '@/entities/note/hooks';
import HeaderButton from '@/shared/ui/controls/header-button';

const FavoriteButton = () => {
  const [noteData, setNoteData] = useUpdateNoteField('is_favorite');

  const isFavorite = (noteData?.is_favorite === true);

  const toggleIsFavorite = () => {
    setNoteData(prevValue => ({
      ...prevValue,
      is_favorite: !isFavorite
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

export default FavoriteButton;