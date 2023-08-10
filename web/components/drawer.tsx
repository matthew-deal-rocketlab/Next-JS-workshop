import { useContext } from 'react';
import styled from 'styled-components';

import { Sidebar, Icon, IconType } from '@/components';
import { UiContext } from '@/context/ui-context';
import { headerMenuItems } from '@/utils/mainmenu';
import { ICommonProps } from '@/types.d';
import { useIsFirstRender } from '@/hooks/isFirstRender';
import { themeStatic } from '@/theme';

interface IDrawerProps extends ICommonProps {
  $isDrawerOpen: boolean;
  $position: 'left' | 'right';
}

const DrawerContainer = styled.div<IDrawerProps>`
  text-align: center;
  height: 100%;
  width: 60%;
  position: absolute;
  z-index: ${themeStatic.zIndex.three};
  top: 0;
  ${({ $position }) => ($position === 'left' ? 'left: 0;' : 'right: 0;')}
  background-color: ${({ theme }) => theme.colors.dark2};
  overflow: hidden;
  transform: translateX(
    ${({ $isDrawerOpen, $position }) => {
      const traslation = $position === 'left' ? -100 : 100;
      return $isDrawerOpen ? 0 : traslation;
    }}%
  );
  transition: transform 0.5s;
  @media (min-width: ${themeStatic.breakpoints.mobile}) {
    display: none;
  }
`;

const Button = styled.button`
  position: absolute;
  right: 0;
  background-color: transparent;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.light};
  }
  &:focus {
    outline: none;
  }
`;

interface Props {
  position?: 'left' | 'right';
}
const Drawer = ({ position = 'right' }: Props) => {
  const isFirst = useIsFirstRender();
  const uiData = useContext(UiContext);
  const { isDrawerOpen, setUiData } = uiData;
  const handleDrawerClose = () => {
    setUiData({ ...uiData, isDrawerOpen: false });
  };
  if (isFirst) return null;
  return (
    <DrawerContainer $isDrawerOpen={isDrawerOpen} $position={position}>
      <Button onClick={handleDrawerClose}>
        <Icon icon={IconType.XMark} height={15} width={15} fill="white" />
      </Button>
      <Sidebar title="" menuItems={headerMenuItems} />
    </DrawerContainer>
  );
};

export default Drawer;
