import styles from './NotesEmptyMsg.module.scss';

import React from 'react';

import MessageCreateNote from '@/features/message-create-note';

const NotesEmptyMsg = () => (
  <div className={styles.element}>
    <div>No notes here yet.</div>

    <MessageCreateNote />
  </div>
);

export default NotesEmptyMsg;