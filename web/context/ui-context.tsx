import { headerMenuItems } from '@/utils/mainmenu';
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
  navbarActive: headerMenuItems[0].id,
  sidebarActive: '',
  subSidebarActive: '',
  isDrawerOpen: false,
};

type UiData = UiContextProps & {
  setUiData: Dispatch<SetStateAction<UiContextProps>>;
  cleanUpUiData: () => void;
};

export const UiContext = createContext<UiData>({
  ...initialState,
  setUiData: () => {},
  cleanUpUiData: () => {},
});

const UiProvider = ({ children }: any) => {
  const [uiData, setUiData] = useState<UiContextProps>(initialState);
  const cleanUpUiData = () => {
    setUiData(initialState);
  };

  return (
    <UiContext.Provider value={{ ...uiData, setUiData, cleanUpUiData }}>
      {children}
    </UiContext.Provider>
  );
};

export default UiProvider;
