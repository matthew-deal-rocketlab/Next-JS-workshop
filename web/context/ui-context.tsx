import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

interface UiContextProps {
  isMenuOpen: boolean;
  navbarActive: string;
  sidebarActive: string;
  subSidebarActive: string;
  isDrawerOpen: boolean;
}

const initialState: UiContextProps = {
  isMenuOpen: false,
  navbarActive: '',
  sidebarActive: '',
  subSidebarActive: '',
  isDrawerOpen: false,
};

type UiData = UiContextProps & {
  setUiData: Dispatch<SetStateAction<UiContextProps>>;
};

export const UiContext = createContext<UiData>({
  ...initialState,
  setUiData: () => {},
});

const UiProvider = ({ children }: any) => {
  const [uiData, setUiData] = useState<UiContextProps>(initialState);

  return (
    <UiContext.Provider value={{ ...uiData, setUiData }}>
      {children}
    </UiContext.Provider>
  );
};

export default UiProvider;
