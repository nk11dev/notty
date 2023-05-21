import styles from './NoteField.module.scss';

import React from 'react';

type Props = {
  text: string,
  data: string | number,
};

const NoteField = (props: Props) => {
  const { text, data } = props;

  if (!text || !data) return null;

  return (
    <div className={styles.field}>
      <span className="me-1">{text}:</span>
      <span>{data}</span>
    </div>
  );
};

export default NoteField;
