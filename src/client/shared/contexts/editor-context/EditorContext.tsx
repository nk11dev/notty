import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';

import type { NullableEditor } from '@/shared/types';

type Props = {
  editor: NullableEditor,
  children: ReactNode,
};

type ContextType = {
  editor: NullableEditor,
  isTitleFocused: boolean,
  setTitleFocus: (value: boolean) => void,
};

const ContextDefault = {
  editor: null,
  isTitleFocused: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setTitleFocus: () => { }
}

export const EditorContext = createContext<ContextType>(ContextDefault);

export const EditorContextProvider = ({ editor, children }: Props) => {
  const [isTitleFocused, setTitleFocus] = useState<boolean>(false);

  return (
    <EditorContext.Provider value={{
      editor,
      isTitleFocused,
      setTitleFocus
    }}>
      {children}
    </EditorContext.Provider>
  );
};