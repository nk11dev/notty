import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';

import type { NullableEditor } from '@/shared/types';

type Props = {
  editor: NullableEditor,
  children: ReactNode,
};

type ContextType = {
  editor: NullableEditor,
  isEditorMenuDisabled: boolean,
  disableEditorMenu: (value: boolean) => void,
};

const ContextDefault = {
  editor: null,
  isEditorMenuDisabled: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  disableEditorMenu: () => { }
}

export const EditorContext = createContext<ContextType>(ContextDefault);

export const EditorContextProvider = ({ editor, children }: Props) => {
  const [isEditorMenuDisabled, disableEditorMenu] = useState<boolean>(false);

  return (
    <EditorContext.Provider value={{
      editor,
      isEditorMenuDisabled,
      disableEditorMenu
    }}>
      {children}
    </EditorContext.Provider>
  );
};