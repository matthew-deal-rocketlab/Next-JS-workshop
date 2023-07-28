import React, { useContext } from 'react';
import styled from 'styled-components';

import { themeStatic } from '@/theme';
import { ArrowDownIcon, ArrowUpIcon, XMarkIcon } from '@/components';
import Sidebar from './sidebar';
import { UiContext } from '@/context/ui-context';

interface IDrawerProps {
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
  background-color: ${({ theme }) => theme.colors.primary};
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
    background-color: ${({ theme }) => theme.colors.secondary};
  }
  &:focus {
    outline: none;
  }
`;

interface Props {
  position?: 'left' | 'right';
}
const Drawer = ({ position = 'right' }: Props) => {
  const uiData = useContext(UiContext);
  const { isDrawerOpen, setUiData } = uiData;
  const handleDrawerClose = () => {
    setUiData({ ...uiData, isDrawerOpen: false });
  };
  return (
    <DrawerContainer $isDrawerOpen={isDrawerOpen} $position={position}>
      <Button onClick={handleDrawerClose}>
        <XMarkIcon height={15} width={15} fill="white" />
      </Button>
      <Sidebar />
    </DrawerContainer>
  );
};

export default Drawer;
{
  /* <Title>Menu</Title>
{menuItems.map((item, index) =>
  item.items ? (
    // Is a group menu item
    <MenuItemContainer key={`sub-menu-${index}-${item.id}`}>
      <GroupMenuItem
        $isActive={item.id === activeItem}
        onClick={() => handleClickeableMenuItemClick(item)}>
        {item.label}
        {isMenuOpen && activeItem === item.id ? (
          <ArrowUpIcon fill="white" height={10} width={10} />
        ) : (
          <ArrowDownIcon fill="white" height={10} width={10} />
        )}
      </GroupMenuItem>
      {isMenuOpen &&
        activeItem === item.id &&
        item.items.map((item, subindex) => (
          <GroupMenuItem
            key={`menu--${item.id}`}
            $isActive={index === activeItem && subindex === activeSubItem}
            onClick={() => handleSubMenuItemClick(item)}>
            {item.label}
          </GroupMenuItem>
        ))}
    </MenuItemContainer>
  ) : (
    // Is a simple menu item
    <MenuItem
      key={`menu--${item.id}`}
      $isActive={item.id === activeItem}
      onClick={() => handleMenuItemClick(item)}>
      {item.label}
    </MenuItem>
  ),
)} */
}
