import type { ReactElement } from 'react';
import type { Editor } from '@tiptap/core';

export type NullableEditor = Editor | null;

export type EditorProps = {
  editor: NullableEditor
};

export type EditorButtonProps = {
  tooltip: string,
  icon: ReactElement,
  onClick: () => void,
  isDisabled?: boolean,
  isActive?: boolean,
};