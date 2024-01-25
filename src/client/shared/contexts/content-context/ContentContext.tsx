import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';

type ProviderProps = {
  children: ReactNode,
};

type ContextType = {
  isTitleFocused: boolean,
  setTitleFocus: (value: boolean) => void
};

const ContextDefault = {
  isTitleFocused: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setTitleFocus: () => { }
}

export const ContentContext = createContext<ContextType>(ContextDefault);

export const ContentContextProvider = ({ children }: ProviderProps) => {
  const [isTitleFocused, setTitleFocus] = useState<boolean>(false);

  return (
    <ContentContext.Provider value={{
      isTitleFocused,
      setTitleFocus
    }}>
      {children}
    </ContentContext.Provider>
  );
};
